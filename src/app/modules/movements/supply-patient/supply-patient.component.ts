import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeAll, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Item, Movement } from 'src/app/model/movement';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import { FormUtilsService } from 'src/app/shared/service/form-utils.service';
import { formatCpf, unformatCpf } from 'src/app/shared/utils/cpf-utils';
import { FormValidations } from 'src/app/shared/validation/form-validations';

const EXPECTED_DIGITATION = 300;
const SIZE = 50;

@Component({
  templateUrl: './supply-patient.component.html',
  styleUrls: ['./supply-patient.component.scss']
})
export class SupplyPatientComponent implements OnInit {

  movementForm!: FormGroup;
  subscription: Subscription;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  filteredOptions$: Observable<Patient[]>;

  patientsAll$ = this.patientService.getAllWithPaginate({size: SIZE}).pipe(
    tap(() => {
      console.log('Fluxo inicial')
    }),
    map(o => o.content)
  );
  patients$: Observable<Patient[]>;

  patientsOptions: Patient[] = [
    { id: 1, name: 'Manoel Regufe Gonçalves Geraldo', cpf: 83623124087 },
    { id: 2, name: 'Kevin Luques Furtunato Salles', cpf: 77120788078 },
    { id: 3, name: 'José Milton Dias Texeira Medeiros', cpf: 87746348793 },
    { id: 4, name: 'Monique Amorim Fundão Rangel', cpf: 94139254025 },
    { id: 5, name: 'IVONE LUCIO MENDES BATISTA', cpf: 82423862776 },
  ];
    
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {    
    this.subscription = this.route.data.subscribe((info: { movement: Movement }) => {      
      this.movementFormBuilder(info.movement || {} as Movement);
    });

    this.filteredOptions$ = this.movementForm.get('patient.name').valueChanges.pipe(
      takeUntil(this.destroyed$),
      startWith(''),
      debounceTime(EXPECTED_DIGITATION),
      //tap(console.log),
      filter((valueDigited) => valueDigited && (valueDigited.length >= 3 || !valueDigited.length)),
      distinctUntilChanged(),
      switchMap((valueDigited => this.patientService.getAllWithPaginate({size: 50, name: valueDigited}).pipe(map(o => o.content)))),      
    );
    this.patients$ = of(this.patientsAll$, this.filteredOptions$).pipe(takeUntil(this.destroyed$), mergeAll());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private movementFormBuilder(movement: Movement) {
    this.movementForm = this.formBuilder.group({
      id: [movement?.id],
      patient: this.formBuilder.group({
        cpf: [formatCpf(movement?.patient?.cpf), [Validators.required, FormValidations.cpfValidator, Validators.maxLength(14)]],
        name: [movement.patient, [Validators.required]]
      }),
      company: this.formBuilder.group({
        cnpj: '',
        name: ''
      }),
      sector: this.formBuilder.group({
        id: null,
        name: ''
      }),
      stock: this.formBuilder.group({
        id: null,
        name: ''
      }),
      items: this.formBuilder.array(this.retrieveMedicaments(movement), Validators.required),
    });
  }

  private retrieveMedicaments(movement: Movement) {
    const items = [];
    if (movement?.items) {
      movement.items.forEach(item => items.push(this.createItem(item)));
    } else {
      items.push(this.createItem());
    }
    return items;
  }

  private createItem(item: Item = { id: null, name: '', amount: null }) {
    return this.formBuilder.group({
      id: [item.id],
      name: [item.name, [Validators.required]],
      amount: [item.amount, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.movementForm.valid) {
      console.log(this.movementForm.getRawValue())
    } else {
      this.formUtils.validateAllFormFields(this.movementForm);
    }
  }

  getItemsFormArray() {
    return (<UntypedFormArray>this.movementForm.get('items')).controls;
  }

  addNewItem() {
    const items = this.movementForm.get('items') as UntypedFormArray;
    items.push(this.createItem());
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.movementForm, fieldName);
  }

  displayFnPatient(patient: Patient): string {
    return patient && patient.name ? patient.name : '';
  }

  onOptionSelectedPatient(event: MatAutocompleteSelectedEvent): void {
    const selectedItemPatient = event.option.value as Patient;
    this.movementForm.get('patient.cpf').patchValue(formatCpf(selectedItemPatient.cpf));
  }

  onBlurPatientCpf(): void {
    if (this.movementForm.get('patient.cpf').value === '') {
      this.movementForm.get('patient.name').reset();
      return;
    }
    
    const cpf = Number(unformatCpf(this.movementForm.get('patient.cpf').getRawValue()));
    if (!cpf) {
      return;
    }
    this.subscription = this.patientService.findByCpf(cpf)
      .subscribe(patient => 
        this.movementForm.get('patient.name').patchValue(patient), 
        error => {
          this.movementForm.get('patient.cpf').reset();
          this.movementForm.get('patient.name').reset();
      });
  }

}

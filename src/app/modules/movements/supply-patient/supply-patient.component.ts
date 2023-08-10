import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Item, Movement } from 'src/app/model/movement';
import { Patient } from 'src/app/model/patient';
import { FormUtilsService } from 'src/app/shared/service/form-utils.service';
import { formatCpf } from 'src/app/shared/utils/cpf-utils';
import { FormValidations } from 'src/app/shared/validation/form-validations';

@Component({
  templateUrl: './supply-patient.component.html',
  styleUrls: ['./supply-patient.component.scss']
})
export class SupplyPatientComponent implements OnInit {

  movementForm!: FormGroup;

  patientsOptions: Patient[] = [
    { id: 1, name: 'Manoel Regufe Gonçalves Geraldo', cpf: 83623124087 },
    { id: 2, name: 'Kevin Luques Furtunato Salles', cpf: 77120788078 },
    { id: 3, name: 'José Milton Dias Texeira Medeiros', cpf: 87746348793 },
    { id: 4, name: 'Monique Amorim Fundão Rangel', cpf: 94139254025 },
    { id: 5, name: 'IVONE LUCIO MENDES BATISTA', cpf: 82423862776 },
  ];
  filteredOptions: Observable<Patient[]>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    public formUtils: FormUtilsService
  ) { }

  ngOnInit(): void {
    const movement = {
      id: 1,
      patient: { cpf: 82423862776, name: 'Ivone Lucio Mendes Batista' } as Patient,
      company: { cnpj: 71563285000117, name: 'Psicologia Inácio' },
      sector: { id: 1, name: 'Setor 1' },
      stock: { id: 1, name: 'Estoque 10' },
      items: [
        //{id: 1, name: 'A1', amount: 15}
      ]
    } as Movement;

    this.movementForm = this.formBuilder.group({
      patient: this.formBuilder.group({
        cpf: [''/*formatCpf(movement.patient.cpf)*/, [Validators.required, FormValidations.cpfValidator, Validators.maxLength(14)]],
        name: [''/*movement.patient*/, [Validators.required]]
      }),
      company: this.formBuilder.group({
        cnpj: movement.company.cnpj,
        name: movement.company.name
      }),
      sector: this.formBuilder.group({
        id: movement.sector.id,
        name: movement.sector.name
      }),
      stock: this.formBuilder.group({
        id: movement.stock.id,
        name: movement.stock.name
      }),
      items: this.formBuilder.array(this.retrieveMedicaments(movement), Validators.required),
    });

    this.filteredOptions = this.movementForm.get('patient.name').valueChanges.pipe(
      //startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.patientsOptions.slice();
      })
    );

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

  displayFn(patient: Patient): string {
    return patient && patient.name ? patient.name : '';
  }

  private _filter(name: string): Patient[] {
    const filterValue = name.toLowerCase();

    return this.patientsOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedItemPatient = event.option.value as Patient;
    this.movementForm.get('patient.cpf').patchValue(formatCpf(selectedItemPatient.cpf));
  }

}

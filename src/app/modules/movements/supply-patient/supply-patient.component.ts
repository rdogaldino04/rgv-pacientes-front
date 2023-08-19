import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeAll, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Company } from 'src/app/model/company';
import { Item, Movement } from 'src/app/model/movement';
import { Patient } from 'src/app/model/patient';
import { Sector } from 'src/app/model/sector';
import { Stock } from 'src/app/model/stock';
import { CompanyService } from 'src/app/service/company.service';
import { MaterialService } from 'src/app/service/material.service';
import { PatientService } from 'src/app/service/patient.service';
import { SectorService } from 'src/app/service/sector.service';
import { StockService } from 'src/app/service/stock.service';
import { FormUtilsService } from 'src/app/shared/service/form-utils.service';
import { formatCnpj } from 'src/app/shared/utils/cnpj-utils';
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

  filteredOptionsPatients$: Observable<Patient[]>;
  patientsAll$ = this.patientService.getAllWithPaginate({ size: SIZE }).pipe(
    tap(() => { console.log('Fluxo inicial patient') }),
    map(o => o.content)
  );
  patients$: Observable<Patient[]>;

  filteredOptionsCompany$: Observable<Company[]>;
  companiesAll$ = this.companyService.findByName('').pipe(
    tap(() => { console.log('Fluxo inicial company') }),
  );
  companies$: Observable<Company[]>;

  filteredOptionsSector$: Observable<Sector[]>;
  sectorsAll$ = this.sectorService.findByName('').pipe(
    tap(() => { console.log('Fluxo inicial sector') }),
  );
  sectors$: Observable<Sector[]>;

  filteredOptionsStock$: Observable<Stock[]>;
  stocksAll$ = this.stockService.findByName('').pipe(
    tap(() => { console.log('Fluxo inicial stock') }),
  );
  stocks$: Observable<Stock[]>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService,
    private patientService: PatientService,
    private companyService: CompanyService,
    private sectorService: SectorService,
    private stockService: StockService,
    private materialService: MaterialService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((info: { movement: Movement }) => this.movementFormBuilder(info.movement || {} as Movement));
    this.configAutocompletePatient();
    this.configAutocompleteCompany();
    this.configAutocompleteSector();
    this.configAutocompleteStock();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private movementFormBuilder(movement: Movement) {
    this.movementForm = this.formBuilder.group({
      id: [movement?.id],
      patientCpf: [formatCpf(movement?.patient?.cpf), [Validators.required, FormValidations.cpfValidator, Validators.maxLength(14)]],
      patient: [movement.patient, [Validators.required]],
      companyCnpj: [formatCnpj(movement?.company?.cnpj), [Validators.required, Validators.maxLength(18)]],
      company: [movement?.company, [Validators.required]],
      sectorId: [movement?.sector?.id, [Validators.required]],
      sector: [movement?.sector, [Validators.required]],
      stockId: [movement?.stock?.id, [Validators.required]],
      stock: [movement?.stock, [Validators.required]],
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

  private createItem(item: Item = { id: null, material: null, amount: null }) {
    return this.formBuilder.group({
      id: [item.id],
      materialId: [item?.material?.id, [Validators.required]],
      material: [item?.material?.name, [Validators.required]],
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

  displayFnCompany(company: Company): string {
    return company && company.name ? company.name : '';
  }

  displayFnSector(sector: Sector) {
    return sector && sector.name ? sector.name : '';
  }

  displayFnStock(stock: Stock) {
    return stock && stock.name ? stock.name : '';
  }

  onOptionSelectedPatient(event: MatAutocompleteSelectedEvent): void {
    const selectedItemPatient = event.option.value as Patient;
    this.movementForm.get('patientCpf').patchValue(formatCpf(selectedItemPatient.cpf));
  }

  onOptionSelectedCompany(event: MatAutocompleteSelectedEvent): void {
    const selectedItemCompany = event.option.value as Company;
    this.movementForm.get('companyCnpj').patchValue(formatCnpj(selectedItemCompany.cnpj));
  }

  onOptionSelectedSector(event: MatAutocompleteSelectedEvent): void {
    const selectedItemSector = event.option.value as Sector;
    this.movementForm.get('sectorId').patchValue(selectedItemSector.id);
  }

  onOptionSelectedStock(event: MatAutocompleteSelectedEvent): void {
    const selectedItemStock = event.option.value as Stock;
    this.movementForm.get('stockId').patchValue(selectedItemStock.id);
  }

  onBlurPatientCpf(): void {
    if (this.movementForm.get('patientCpf').value === '') {
      this.movementForm.get('patient').reset();
      return;
    }

    const cpf = Number(unformatCpf(this.movementForm.get('patientCpf').getRawValue()));
    if (!cpf) {
      return;
    }
    this.subscription = this.patientService.findByCpf(cpf)
      .subscribe(patient =>
        this.movementForm.get('patient').patchValue(patient),
        error => {
          this.movementForm.get('patientCpf').reset();
          this.movementForm.get('patient').reset();
        });
  }

  onBlurCompanyCnpj(): void {
    if (this.movementForm.get('companyCnpj').value === '') {
      this.movementForm.get('company').reset();
      return;
    }

    const cnpj = Number(this.movementForm.get('companyCnpj').getRawValue());
    if (!cnpj) {
      return;
    }
    this.subscription = this.companyService.findByCnpj(cnpj)
      .subscribe(company =>
        this.movementForm.get('company').patchValue(company),
        error => {
          this.movementForm.get('companyCnpj').reset();
          this.movementForm.get('company').reset();
        });
  }

  onBlurSectorId() {
    if (this.movementForm.get('sectorId').value === '') {
      this.movementForm.get('sector').reset();
      return;
    }

    const id = Number(this.movementForm.get('sectorId').getRawValue());
    if (!id) {
      return;
    }

    this.subscription = this.sectorService.findById(id)
      .subscribe(sector =>
        this.movementForm.get('sector').patchValue(sector),
        error => {
          this.movementForm.get('sectorId').reset();
          this.movementForm.get('sector').reset();
        });
  }

  onBlurStockId() {
    if (this.movementForm.get('stockId').value === '') {
      this.movementForm.get('stock').reset();
      return;
    }

    const id = Number(this.movementForm.get('stockId').getRawValue());
    if (!id) {
      return;
    }

    this.subscription = this.stockService.findById(id)
      .subscribe(stock =>
        this.movementForm.get('stock').patchValue(stock),
        error => {
          this.movementForm.get('stockId').reset();
          this.movementForm.get('stock').reset();
        });
  }

  onBlurMaterialId(index: number) {
    const itemsForm = this.getItemsFormArray()[index];
    const id = Number(itemsForm.get('materialId').getRawValue());
    if (itemsForm.get('materialId').getRawValue() === '') {
      itemsForm.get('material').reset();
      return;
    }

    this.subscription = this.materialService.findById(id)
      .subscribe(material => {
        itemsForm.get('material').patchValue(material?.name)
      },
        error => {
          itemsForm.get('materialId').reset();
          itemsForm.get('material').reset();
        });
  }

  private configAutocompletePatient() {
    this.filteredOptionsPatients$ = this.movementForm.get('patient').valueChanges.pipe(
      takeUntil(this.destroyed$),
      startWith(''),
      debounceTime(EXPECTED_DIGITATION),
      //tap(console.log),
      filter((valueDigited) => valueDigited && (valueDigited.length >= 3 || !valueDigited.length)),
      distinctUntilChanged(),
      switchMap((valueDigited => this.patientService.getAllWithPaginate({ size: 50, name: valueDigited }).pipe(map(o => o.content))))
    );
    this.patients$ = of(this.patientsAll$, this.filteredOptionsPatients$).pipe(takeUntil(this.destroyed$), mergeAll());
  }

  private configAutocompleteCompany() {
    this.filteredOptionsCompany$ = this.movementForm.get('company').valueChanges.pipe(
      takeUntil(this.destroyed$),
      startWith(''),
      debounceTime(EXPECTED_DIGITATION),
      filter((valueDigited) => valueDigited && (valueDigited.length >= 3 || !valueDigited.length)),
      distinctUntilChanged(),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name;
      }),
      switchMap(valueDigited => this.companyService.findByName(valueDigited)),
    );
    this.companies$ = of(this.companiesAll$, this.filteredOptionsCompany$).pipe(takeUntil(this.destroyed$), mergeAll());
  }

  private configAutocompleteSector() {
    this.filteredOptionsSector$ = this.movementForm.get('sector').valueChanges.pipe(
      takeUntil(this.destroyed$),
      startWith(''),
      debounceTime(EXPECTED_DIGITATION),
      filter((valueDigited) => valueDigited && (valueDigited.length >= 3 || !valueDigited.length)),
      distinctUntilChanged(),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name;
      }),
      switchMap(valueDigited => this.sectorService.findByName(valueDigited)),
    );
    this.sectors$ = of(this.sectorsAll$, this.filteredOptionsSector$).pipe(takeUntil(this.destroyed$), mergeAll());
  }

  private configAutocompleteStock() {
    this.filteredOptionsStock$ = this.movementForm.get('stock').valueChanges.pipe(
      takeUntil(this.destroyed$),
      startWith(''),
      debounceTime(EXPECTED_DIGITATION),
      filter((valueDigited) => valueDigited && (valueDigited.length >= 3 || !valueDigited.length)),
      distinctUntilChanged(),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name;
      }),
      switchMap(valueDigited => this.stockService.findByName(valueDigited)),
    );
    this.stocks$ = of(this.stocksAll$, this.filteredOptionsStock$).pipe(takeUntil(this.destroyed$), mergeAll());
  }

  removeItem(index: number): void {
    const items = this.movementForm.get('items') as UntypedFormArray;
    items.removeAt(index);
  }

}

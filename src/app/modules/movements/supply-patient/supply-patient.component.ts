import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, Subscription, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeAll,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Company } from 'src/app/model/company';
import { Movement } from 'src/app/model/movement';
import { MovimentItem } from 'src/app/model/movement-item';
import { Patient } from 'src/app/model/patient';
import { Product } from 'src/app/model/product';
import { Sector } from 'src/app/model/sector';
import { Stock } from 'src/app/model/stock';
import { CompanyService } from 'src/app/service/company.service';
import { MovementService } from 'src/app/service/movement.service';
import { PatientService } from 'src/app/service/patient.service';
import { ProductService } from 'src/app/service/product.service';
import { SectorService } from 'src/app/service/sector.service';
import { FormUtilsService } from 'src/app/shared/service/form-utils.service';
import { formatCnpj, unformatCnpj } from 'src/app/shared/utils/cnpj-utils';
import { formatCpf, unformatCpf } from 'src/app/shared/utils/cpf-utils';
import { FormValidations } from 'src/app/shared/validation/form-validations';

const EXPECTED_DIGITATION = 300;
const DISABLE = false;
const ENABLE = true;

@Component({
  templateUrl: './supply-patient.component.html',
  styleUrls: ['./supply-patient.component.scss'],
})
export class SupplyPatientComponent implements OnInit {
  movementForm!: FormGroup;
  subscription: Subscription;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  filteredOptionsPatients$: Observable<Patient[]>;
  patientsAll$ = of([]);
  patients$: Observable<Patient[]>;

  filteredOptionsCompany$: Observable<Company[]>;
  companiesAll$ = of([]);
  companies$: Observable<Company[]>;
  companies: Company[];

  filteredOptionsSector$: Observable<Sector[]>;
  sectorsAll$ = of([]);
  sectors$: Observable<Sector[]>;
  sectors: Sector[] = [];

  filteredOptionsStock$: Observable<Stock[]>;
  stocksAll$ = of([]);
  stocks$: Observable<Stock[]>;
  stocks: Stock[] = [];

  filteredOptionsProducts$: Observable<Product[]>;
  productAll$ = of([]);
  products$: Observable<Product[]>;

  edit: boolean;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService,
    private patientService: PatientService,
    private companyService: CompanyService,
    private sectorService: SectorService,
    private productService: ProductService,
    private movementService: MovementService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(
      (info: { movement: Movement }) =>
        this.movementFormBuilder(info.movement || ({} as Movement))
    );
    this.configAutocompletePatient();
    this.configAutocompleteCompany();
    this.configAutocompleteSector();
    this.configAutocompleteStock();
    this.formUtils.desableOrEnableFields(this.movementForm, DISABLE, [
      'sectorId',
      'sector',
      'stockId',
      'stock',
    ]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private movementFormBuilder(movement: Movement) {
    this.movementForm = this.formBuilder.group({
      id: [movement?.id],
      patientCpf: [
        formatCpf(movement?.patient?.cpf),
        [
          Validators.required,
          FormValidations.cpfValidator,
          Validators.maxLength(14),
        ],
      ],
      patient: [movement.patient, [Validators.required]],
      companyCnpj: [
        formatCnpj(movement?.company?.cnpj),
        [Validators.required, Validators.maxLength(18)],
      ],
      company: [movement?.company, [Validators.required]],
      sectorId: [movement?.sector?.id, [Validators.required]],
      sector: [movement?.sector, [Validators.required]],
      stockId: [movement?.stock?.id, [Validators.required]],
      stock: [movement?.stock, [Validators.required]],
      items: this.formBuilder.array(
        this.retrieveMedicaments(movement),
        Validators.required
      ),
    });

    this.edit = !!movement?.id;
    if (this.edit) {
      this.movementForm.disable();
    }
    this.movementForm.get('id').disable();
  }

  onSubmit(): void {
    if (this.movementForm.valid) {
      this.movementService
        .save({
          id: null,
          patient: this.movementForm.get('patient').value,
          company: this.movementForm.get('company').value,
          sector: this.movementForm.get('sector').value,
          stock: this.movementForm.get('stock').value,
          items: this.movementForm.get('items').value,
        })
        .subscribe((m) => {
          this.movementForm.get('id').patchValue(m.id);
        });
    } else {
      this.formUtils.validateAllFormFields(this.movementForm);
    }
  }

  private retrieveMedicaments(movement: Movement) {
    const items = [];
    if (movement?.items) {
      movement.items.forEach((item) => items.push(this.createItem(item)));
    } else {
      items.push(this.createItem());
    }
    return items;
  }

  private createItem(
    item: MovimentItem = { id: null, product: null, amount: null }
  ): FormGroup {
    const itemFormGroup = this.formBuilder.group({
      id: [item?.id],
      product: [item?.product, [Validators.required]],
      amount: [item?.amount, [Validators.required, Validators.maxLength(10)]],
    });
    this.configAutocompleteProduct(itemFormGroup);
    return itemFormGroup;
  }

  getItemsFormArray(): AbstractControl<any, any>[] {
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
    return patient?.name;
  }

  displayFnCompany(company: Company): string {
    return company?.name;
  }

  displayFnSector(sector: Sector) {
    return sector?.name;
  }

  displayFnStock(stock: Stock) {
    return stock?.name;
  }

  displayFnProduct(product: Product) {
    return product?.name;
  }

  onOptionSelectedPatient(event: MatAutocompleteSelectedEvent): void {
    const selectedItemPatient = event.option.value as Patient;
    this.movementForm
      .get('patientCpf')
      .patchValue(formatCpf(selectedItemPatient.cpf));
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

    const cpf = Number(
      unformatCpf(this.movementForm.get('patientCpf').getRawValue())
    );
    this.subscription = this.patientService.findByCpf(cpf).subscribe(
      (patient) => this.movementForm.get('patient').patchValue(patient),
      () => {
        this.movementForm.get('patient').reset();
      }
    );
  }

  onBlurStockId() {
    if (this.movementForm.get('stockId').value === '') {
      this.movementForm.get('stock').reset();
      return;
    }

    const stockId = Number(this.movementForm.get('stockId').getRawValue());
    if (!stockId) {
      return;
    }

    this.subscription = this.sectorService
      .stocksFindBySector(this.movementForm.get('sectorId').value, { stockId })
      .pipe(map((stocks) => stocks[0]))
      .subscribe(
        (stock) => this.movementForm.get('stock').patchValue(stock),
        () => {
          this.movementForm.get('stockId').reset();
          this.movementForm.get('stock').reset();
        }
      );
  }

  private configAutocompletePatient() {
    this.filteredOptionsPatients$ = this.movementForm
      .get('patient')
      .valueChanges.pipe(
        takeUntil(this.destroyed$),
        startWith(''),
        debounceTime(EXPECTED_DIGITATION),
        filter(
          (valueDigited) =>
            valueDigited && (valueDigited.length >= 3 || !valueDigited.length)
        ),
        distinctUntilChanged(),
        switchMap((valueDigited) =>
          this.patientService
            .getAllWithPaginate({ size: 50, name: valueDigited })
            .pipe(map((o) => o.content))
        )
      );
    this.patients$ = of(this.patientsAll$, this.filteredOptionsPatients$).pipe(
      takeUntil(this.destroyed$),
      mergeAll()
    );
  }

  private configAutocompleteStock() {
    this.filteredOptionsStock$ = this.movementForm
      .get('stock')
      .valueChanges.pipe(
        takeUntil(this.destroyed$),
        startWith(''),
        debounceTime(EXPECTED_DIGITATION),
        filter(
          (valueDigited) =>
            valueDigited && (valueDigited.length >= 3 || !valueDigited.length)
        ),
        distinctUntilChanged(),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name;
        }),
        switchMap((valueDigited) =>
          this.sectorService.stocksFindBySector(
            this.movementForm.get('sectorId').value,
            { stockName: valueDigited }
          )
        )
      );
    this.stocks$ = of(this.stocksAll$, this.filteredOptionsStock$).pipe(
      takeUntil(this.destroyed$),
      mergeAll()
    );
    this.stocks$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((stocks) => (this.stocks = stocks));
  }

  private configAutocompleteProduct(itemFormGroup: FormGroup) {
    // this.filteredOptionsProducts$ = itemFormGroup.get('product').valueChanges.pipe(
    //   takeUntil(this.destroyed$),
    //   startWith(''),
    //   debounceTime(EXPECTED_DIGITATION),
    //   filter((valueDigited) => valueDigited && (valueDigited.length >= 3 || !valueDigited.length)),
    //   distinctUntilChanged(),
    //   map(value => {
    //     const name = typeof value === 'string' ? value : value?.name;
    //     return name;
    //   }),
    //   switchMap(valueDigited => this.productService.getAll(valueDigited))
    // );
    // this.products$ = of(this.productAll$, this.filteredOptionsProducts$).pipe(takeUntil(this.destroyed$), mergeAll());
  }

  removeItem(index: number): void {
    const items = this.movementForm.get('items') as UntypedFormArray;
    items.removeAt(index);
  }

  onBlurCompanyCnpj(): void {
    const companyCnpjEmpty = this.movementForm.get('companyCnpj').value === '';
    if (companyCnpjEmpty) {
      this.formUtils.resetFields(this.movementForm, [
        'companyCnpj',
        'company',
        'sectorId',
        'sector',
        'stockId',
        'stock',
      ]);
      this.formUtils.desableOrEnableFields(this.movementForm, DISABLE, [
        'sectorId',
        'sector',
        'stockId',
        'stock',
      ]);
      this.sectors = [];
      return;
    }

    const cnpj = Number(
      unformatCnpj(this.movementForm.get('companyCnpj').getRawValue())
    );
    this.subscription = this.companyService.findByCnpj(cnpj).subscribe(
      (company) => {
        this.movementForm.get('company').patchValue(company);
        this.formUtils.desableOrEnableFields(this.movementForm, !!company, [
          'sectorId',
          'sector',
        ]);
      },
      () => {
        this.formUtils.resetFields(this.movementForm, [
          'companyCnpj',
          'company',
          'sectorId',
          'sector',
          'stockId',
          'stock',
        ]);
        this.formUtils.desableOrEnableFields(this.movementForm, DISABLE, [
          'sectorId',
          'sector',
        ]);
      }
    );
  }

  private configAutocompleteCompany(): void {
    // this.filteredOptionsCompany$ = this.movementForm
    //   .get('company')
    //   .valueChanges.pipe(
    //     takeUntil(this.destroyed$),
    //     startWith(''),
    //     debounceTime(EXPECTED_DIGITATION),
    //     tap((value) => {
    //       const company = typeof value === 'string' ? value : value?.name;
    //       if (company !== '') {
    //         return;
    //       }
    //       this.formUtils.resetFields(this.movementForm, [
    //         'sectorId',
    //         'sector',
    //         'companyCnpj',
    //         'stockId',
    //         'stock',
    //       ]);
    //       this.formUtils.desableOrEnableFields(this.movementForm, DISABLE, [
    //         'sectorId',
    //         'sector',
    //         'stockId',
    //         'stock',
    //       ]);
    //     }),
    //     filter(
    //       (valueDigited) =>
    //         valueDigited && (valueDigited.length >= 3 || !valueDigited.length)
    //     ),
    //     distinctUntilChanged(),
    //     map((value) => {
    //       const name = typeof value === 'string' ? value : value?.name;
    //       return name;
    //     }),
    //     switchMap((valueDigited) => this.companyService.getAll(valueDigited))
    //   );
    // this.companies$ = of(this.companiesAll$, this.filteredOptionsCompany$).pipe(
    //   takeUntil(this.destroyed$),
    //   mergeAll()
    // );
    // this.companies$.pipe(takeUntil(this.destroyed$)).subscribe((companies) => {
    //   this.companies = companies;
    // });
  }

  onOptionSelectedCompany(event: MatAutocompleteSelectedEvent): void {
    const selectedItemCompany = event.option.value as Company;
    this.movementForm
      .get('companyCnpj')
      .patchValue(formatCnpj(selectedItemCompany.cnpj));
    this.formUtils.desableOrEnableFields(this.movementForm, ENABLE, [
      'sectorId',
      'sector',
    ]);
    this.formUtils.resetFields(this.movementForm, ['sectorId', 'sector']);
  }

  onBlurSectorId(): void {
    const sectorIdEmpty = this.movementForm.get('sectorId').value === '';
    if (sectorIdEmpty) {
      this.formUtils.resetFields(this.movementForm, ['stockId', 'stock']);
      this.formUtils.desableOrEnableFields(this.movementForm, DISABLE, [
        'stockId',
        'stock',
      ]);
      return;
    }

    const sectorId = this.movementForm.get('sectorId').getRawValue();
    const company = this.movementForm.get('company').getRawValue() as Company;
    this.subscription = this.sectorService
      .getAll({ id: sectorId, companyId: company.id })
      .pipe(map((sectors) => sectors[0]))
      .subscribe(
        (sector) => {
          this.movementForm.get('sector').patchValue(sector);
          this.formUtils.resetFields(this.movementForm, ['stockId', 'stock']);
          this.formUtils.desableOrEnableFields(this.movementForm, !!sector, [
            'stockId',
            'stock',
          ]);
        },
        () => {
          this.formUtils.resetFields(this.movementForm, ['stockId', 'stock']);
          this.formUtils.desableOrEnableFields(this.movementForm, DISABLE, [
            'stockId',
            'stock',
          ]);
        }
      );
  }

  private configAutocompleteSector(): void {
    this.filteredOptionsSector$ = this.movementForm
      .get('sector')
      .valueChanges.pipe(
        takeUntil(this.destroyed$),
        startWith(''),
        debounceTime(EXPECTED_DIGITATION),
        tap((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          if (name !== '') {
            return;
          }
          this.formUtils.resetFields(this.movementForm, ['stockId', 'stock']);
          this.formUtils.desableOrEnableFields(this.movementForm, DISABLE, [
            'stockId',
            'stock',
          ]);
        }),
        filter(
          (valueDigited) =>
            valueDigited && (valueDigited.length >= 3 || !valueDigited.length)
        ),
        distinctUntilChanged(),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name;
        }),
        switchMap((valueDigited) => {
          if (this.companies.length === 0) {
            return of([]);
          }
          return this.sectorService.getAll({
            name: valueDigited,
            companyId: this.movementForm.get('company').value.id,
          });
        })
      );
    this.sectors$ = of(this.sectorsAll$, this.filteredOptionsSector$).pipe(
      takeUntil(this.destroyed$),
      mergeAll()
    );
    this.sectors$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((sectors) => (this.sectors = sectors));
  }

  onOptionSelectedSector(event: MatAutocompleteSelectedEvent): void {
    const selectedItemSector = event.option.value as Sector;
    this.movementForm.get('sectorId').patchValue(selectedItemSector.id);
    this.formUtils.resetFields(this.movementForm, ['stockId', 'stock']);
    this.formUtils.desableOrEnableFields(this.movementForm, ENABLE, [
      'stockId',
      'stock',
    ]);
  }
}

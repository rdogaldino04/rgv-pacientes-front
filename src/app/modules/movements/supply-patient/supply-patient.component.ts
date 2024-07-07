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
} from 'rxjs/operators';
import { Movement } from 'src/app/model/movement';
import { MovimentItem } from 'src/app/model/movement-item';
import { Patient } from 'src/app/model/patient';
import { Product } from 'src/app/model/product';
import { ProductPage } from 'src/app/model/product-page';
import { Stock } from 'src/app/model/stock';
import { MovementService } from 'src/app/service/movement.service';
import { PatientService } from 'src/app/service/patient.service';
import { ProductService } from 'src/app/service/product.service';
import { StockService } from 'src/app/service/stock.service';
import { FormUtilsService } from 'src/app/shared/service/form-utils.service';
import { EXPECTED_DIGITATION } from 'src/app/shared/utils/constants';
import { formatCpf, unformatCpf } from 'src/app/shared/utils/cpf-utils';
import { FormValidations } from 'src/app/shared/validation/form-validations';

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
    private productService: ProductService,
    private movementService: MovementService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(
      (info: { movement: Movement }) =>
        this.movementFormBuilder(info.movement || ({} as Movement))
    );
    this.configAutocompletePatient();
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
      patientCpf: [
        formatCpf(movement?.patient?.cpf),
        [
          Validators.required,
          FormValidations.cpfValidator,
          Validators.maxLength(14),
        ],
      ],
      patient: [movement.patient, [Validators.required]],
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
    if (!this.movementForm.get('stockId').value) {
      this.movementForm.get('stock').reset();
      return;
    }

    this.subscription = this.stockService
      .findById(this.movementForm.get('stockId').value)
      .subscribe((stock) => this.movementForm.get('stock').patchValue(stock));
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
          this.patientService.getAllWithPaginateResume({
            size: 50,
            name: valueDigited,
          })
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
          this.stockService
            .getStockByFilter({ name: valueDigited })
            .pipe(map((stockPage) => stockPage.content))
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
    this.filteredOptionsProducts$ = itemFormGroup
      .get('product')
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
          this.productService
            .getProductByFilter({ name: valueDigited })
            .pipe(map((productPage: ProductPage) => productPage.content))
        )
      );
    this.products$ = of(this.productAll$, this.filteredOptionsProducts$).pipe(
      takeUntil(this.destroyed$),
      mergeAll()
    );
  }

  removeItem(index: number): void {
    const items = this.movementForm.get('items') as UntypedFormArray;
    items.removeAt(index);
  }
}

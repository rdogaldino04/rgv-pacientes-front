import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { Batch } from 'src/app/model/batch';
import { Error } from 'src/app/model/error';
import { Product } from 'src/app/model/product';
import { BatchService } from 'src/app/service/batch.service';
import { ProductService } from 'src/app/service/product.service';
import { FormUtilsService } from 'src/app/shared/service/form-utils.service';
import { EXPECTED_DIGITATION } from 'src/app/shared/utils/constants';

@Component({
  templateUrl: './batch-form.component.html',
  styleUrls: ['./batch-form.component.scss'],
})
export class BatchFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription: Subscription;
  edit = false;

  products$: Observable<Product[]>;
  productAll$ = of([]);
  filteredOptionsProducts$: Observable<Product[]>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private formUtilsService: FormUtilsService,
    private batchService: BatchService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((info: { batch: Batch }) => {
      this.edit = !!info.batch?.id;
      this.batchFormBuilder(info.batch ? info.batch : {});
    });
  }

  private configAutocompleteProduct(form: FormGroup) {
    this.filteredOptionsProducts$ = form.get('product').valueChanges.pipe(
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
          .pipe(map((productPage) => productPage.content))
      )
    );

    this.products$ = of(this.productAll$, this.filteredOptionsProducts$).pipe(
      takeUntil(this.destroyed$),
      mergeAll()
    );
  }

  private batchFormBuilder(batch: Batch) {
    this.form = this.formBuilder.group({
      id: [batch?.id],
      batchNumber: [batch?.batchNumber, [Validators.required]],
      manufactureDate: [batch?.manufactureDate, [Validators.required]],
      expiryDate: [batch?.expiryDate, [Validators.required]],
      product: [batch?.product, [Validators.required]],
    });
    this.configAutocompleteProduct(this.form);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.formUtilsService.validateAllFormFields(this.form);
      return;
    }
    if (this.edit) {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    this.batchService.create(this.form.getRawValue() as Product).subscribe(
      () => this.onSuccess(),
      (response) => this.onError(response.error)
    );
  }

  private update(): void {
    this.batchService.update(this.form.getRawValue() as Product).subscribe(
      () => this.onSuccess(),
      (response) => this.onError(response.error)
    );
  }

  private onSuccess(): void {
    this.snackBar.open('Lote salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError(error: Error): void {
    if (error) {
      this.snackBar.open(error.detail, '', { duration: 5000 });
      return;
    }
    this.snackBar.open('Erro ao salvar lote.', '', { duration: 5000 });
  }

  private onCancel() {
    this.location.back();
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtilsService.getFieldErrorMessage(this.form, fieldName);
  }

  displayFnProduct(product: Product) {
    return product?.name;
  }
}

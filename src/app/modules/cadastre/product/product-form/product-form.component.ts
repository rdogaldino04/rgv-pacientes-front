import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Error } from 'src/app/model/error';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { FormUtilsService } from 'src/app/shared/service/form-utils.service';
import { FormValidations } from 'src/app/shared/validation/form-validations';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription: Subscription;
  edit = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private formUtilsService: FormUtilsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(
      (info: { product: Product }) => {
        this.edit = !!info.product?.id;
        this.productFormBuilder(info.product ? info.product : {});
      }
    );
  }

  private productFormBuilder(product: Product) {
    this.form = this.formBuilder.group({
      id: [product?.id],
      name: [product?.name, [Validators.required]],
      expirationDate: [
        product?.expirationDate,
        [Validators.required, FormValidations.futureDateValidator],
      ],
    });
    this.form.get('id').disable();
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
    this.productService.create(this.form.getRawValue() as Product).subscribe(
      () => this.onSuccess(),
      (response) => this.onError(response.error)
    );
  }

  private update(): void {
    this.productService.update(this.form.getRawValue() as Product).subscribe(
      () => this.onSuccess(),
      (response) => this.onError(response.error)
    );
  }

  private onSuccess(): void {
    this.snackBar.open('Paciente salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError(error: Error): void {
    if (error) {
      this.snackBar.open(error.detail, '', { duration: 5000 });
      return;
    }
    this.snackBar.open('Erro ao salvar product.', '', { duration: 5000 });
  }

  private onCancel() {
    this.location.back();
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtilsService.getFieldErrorMessage(this.form, fieldName);
  }
}

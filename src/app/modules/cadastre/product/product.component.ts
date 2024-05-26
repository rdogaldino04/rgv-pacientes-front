import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductFilter } from 'src/app/model/Product-filter';
import { ProductPage } from 'src/app/model/product-page';
import { ProductService } from 'src/app/service/product.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productPage$: Observable<ProductPage> | null = null;
  productFilterform: UntypedFormGroup;

  constructor(
    private productService: ProductService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productPage$ = this.productService.getProductByFilter({
      id: 0,
      name: '',
      page: 0,
      size: 5,
    });
    this.productFilterform = this.formBuilder.group({
      id: [null],
      name: [null],
      size: [null],
      page: [null],
    });
  }

  onFilter(): void {
    this.productPage$ = this.productService.getProductByFilter(
      this.productFilterform.getRawValue() as ProductFilter
    );
  }

  onCreate(): void {
    this.router.navigate(['cadastros/products', 'new']);
  }

  onUpdate(id: number): void {
    this.router.navigate(['cadastros/products', 'edit', id]);
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o medicamento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.delete(id).subscribe(
          () => {
            this.onFilter();
          },
          (e) => {
            if (e?.status === 400 || e?.status === 404) {
              this.snackBar.open(e?.error?.userMessage, '', { duration: 5000 });
            } else {
              this.snackBar.open('Erro ao excluir o produto', '', {
                duration: 5000,
              });
            }
          }
        );
      }
    });
  }

  onPageInfo(pageEvent: PageEvent): void {
    this.productFilterform.get('size').setValue(pageEvent.pageSize);
    this.productFilterform.get('page').setValue(pageEvent.pageIndex);
    this.productPage$ = this.productService.getProductByFilter(
      this.productFilterform.getRawValue() as ProductFilter
    );
  }
}

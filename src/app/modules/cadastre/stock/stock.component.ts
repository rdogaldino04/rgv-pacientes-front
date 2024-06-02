import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StockPage } from 'src/app/model/stock-page';
import { StockService } from 'src/app/service/stock.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  stockPage$: Observable<StockPage> | null = null;
  stockFilterform: UntypedFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private stockService: StockService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.stockPage$ = of(data.stockPage);
    });
    this.stockFilterform = this.formBuilder.group({
      id: [null],
      name: [null],
      sector: [null],
      size: [null],
      page: [null],
    });
  }

  onPageInfo(pageEvent: PageEvent): void {
    this.stockFilterform.get('size').setValue(pageEvent.pageSize);
    this.stockFilterform.get('page').setValue(pageEvent.pageIndex);
    this.stockPage$ = this.stockService.getStockByFilter(
      this.stockFilterform.getRawValue()
    );
  }

  onFilter(): void {
    this.stockPage$ = this.stockService.getStockByFilter(
      this.stockFilterform.getRawValue()
    );
  }

  onUpdate(id: number): void {
    this.router.navigate(['cadastros/stocks', 'edit', id]);
  }

  onCreate(): void {
    this.router.navigate(['cadastros/stocks', 'new']);
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o estoque?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.stockService.delete(id).subscribe(
          () => {
            this.onFilter();
          },
          (e) => {
            if (e?.status === 400 || e?.status === 404) {
              this.snackBar.open(e?.error?.userMessage, '', { duration: 5000 });
            } else {
              this.snackBar.open('Erro ao excluir o estoque', '', {
                duration: 5000,
              });
            }
          }
        );
      }
    });
  }
}

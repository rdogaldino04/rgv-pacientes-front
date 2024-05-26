import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CompanyPage } from 'src/app/model/company-page';
import { CompanyService } from 'src/app/service/company.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { unformatCnpj } from 'src/app/shared/utils/cnpj-utils';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  companyPage: CompanyPage;
  companyPage$: Observable<CompanyPage> | null = null;
  companyFilterform: UntypedFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe(
      (info: { companyPage: CompanyPage }) => {
        this.companyPage = info.companyPage;
      }
    );
    this.companyFilterform = this.formBuilder.group({
      id: [null],
      cnpj: [null],
      name: [null],
      size: [null],
      page: [null],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onPageInfo(pageEvent: PageEvent): void {
    this.companyFilterform.get('size').setValue(pageEvent.pageSize);
    this.companyFilterform.get('page').setValue(pageEvent.pageIndex);
    this.companyService
      .getAll({ page: pageEvent.pageIndex, size: pageEvent.pageSize })
      .subscribe((companyPage) => (this.companyPage = companyPage));
  }

  onFilter(): void {
    this.companyService
      .getAll({
        id: this.companyFilterform.get('id').value,
        cnpj: this.unformatCnpj(),
        name: this.companyFilterform.get('name').value,
      })
      .subscribe((companyPage) => (this.companyPage = companyPage));
  }

  private unformatCnpj(): string {
    return this.companyFilterform.get('cnpj').value
      ? unformatCnpj(this.companyFilterform.get('cnpj').value)
      : '';
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover a empresa?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.companyService.delete(id).subscribe(
          () => {
            this.onFilter();
          },
          (e) => {
            if (e?.status === 400 || e?.status === 404) {
              this.snackBar.open(e?.error?.userMessage, '', { duration: 5000 });
            } else {
              this.snackBar.open('Erro ao excluir a empresa', '', {
                duration: 5000,
              });
            }
          }
        );
      }
    });
  }

  onCreate(): void {
    this.router.navigate(['cadastros/companies', 'new']);
  }

  onUpdate(id: number): void {
    this.router.navigate(['cadastros/companies', 'edit', id]);
  }
}

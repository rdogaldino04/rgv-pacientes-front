import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/model/company';
import { CompanyService } from 'src/app/service/company.service';
import { formatCnpj, unformatCnpj } from 'src/app/shared/utils/cnpj-utils';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe(
      (info: { company: Company }) => {
        this.companyFormBuilder(info.company ? info.company : {});
      }
    );
  }

  companyFormBuilder(company: Company): void {
    this.form = this.formBuilder.group({
      id: [company.id],
      cnpj: [formatCnpj(company.cnpj), Validators.required],
      name: [company.name, Validators.required],
    });
  }

  onSubmit() {
    const company = this.form.getRawValue();
    company.cnpj = unformatCnpj(company.cnpj);
    if (this.form.get('id').value) {
      this.companyService.update(company).subscribe(
        () => {
          this.onSuccess();
        },
        (e) => {
          if (e.status === 400 || e.status === 404) {
            if (e.error && e.error.objects) {
              this.onError(e);
            } else {
              this.snackBar.open('Erro ao salvar a empresa!', '', {
                duration: 5000,
              });
            }
          }
        }
      );
    } else {
      this.companyService.create(company).subscribe(
        () => {
          this.onSuccess();
        },
        (e) => {
          if (e.status === 400 || e.status === 404) {
            if (e.error && e.error.objects) {
              this.onError(e);
            } else {
              this.snackBar.open('Erro ao salvar a empresa!', '', {
                duration: 5000,
              });
            }
          }
        }
      );
    }
  }

  private onError(e: any): void {
    e.error.objects.forEach((messageError) => {
      this.snackBar.open(messageError.userMessage, '', {
        duration: 5000,
      });
    });
  }

  private onSuccess(): void {
    this.snackBar.open('Empresa salva com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onCancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

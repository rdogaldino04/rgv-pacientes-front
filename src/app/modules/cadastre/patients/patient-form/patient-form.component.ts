import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Error } from 'src/app/model/error';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import { FormUtilsService } from 'src/app/shared/service/form-utils.service';
import { formatCpf, unformatCpf } from 'src/app/shared/utils/cpf-utils';
import { FormValidations } from 'src/app/shared/validation/form-validations';

@Component({
  selector: 'app-patient',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit, OnDestroy {

  patientNewForm: UntypedFormGroup;
  subscription: Subscription;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    public formUtils: FormUtilsService
  ) { }

  ngOnInit(): void {
    this.patientFormBuilder();
    this.subscription = this.route.data.subscribe((info: { patient: Patient }) => {
      if (info.patient) {
        this.setPatientform(info);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setPatientform(info: { patient: Patient; }): void {
    this.patientNewForm.get('id').setValue(info.patient.id);
    this.patientNewForm.get('cpf').setValue(formatCpf(info.patient.cpf));
    this.patientNewForm.get('name').setValue(info.patient.name);
    this.patientNewForm.get('phone').setValue(this.formatPhoneNumber(info.patient.phone));
    this.patientNewForm.get('addressName').setValue(info.patient?.address?.addressName);
    this.patientNewForm.get('number').setValue(info.patient?.address?.number);
    this.patientNewForm.get('complement').setValue(info.patient?.address?.complement);
    this.patientNewForm.get('district').setValue(info.patient?.address?.district);
  }

  private patientFormBuilder(): void {
    this.patientNewForm = this.formBuilder.group({
      id: [null],
      cpf: ['', [Validators.required, FormValidations.cpfValidator, Validators.maxLength(14)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(15)]],
      addressName: [''],
      number: [''],
      complement: [''],
      district: [''],
    });
  }

  onSave(): void {
    if (this.patientNewForm.invalid) {
      this.patientNewForm.setErrors({});
      this.formUtils.validateAllFormFields(this.patientNewForm);
      return;
    }

    const patient = this.buildPatientObject();
    if (patient.id) {
      this.patientService.update(patient)
        .subscribe(() => this.onUpdateSuccess(), (response) => this.onError(response.error));
      return;
    }
    this.patientService.save(patient)
      .subscribe(() => this.onSuccess(), (response) => this.onError(response.error));
  }

  private buildPatientObject(): Patient {
    return {
      id: this.patientNewForm.get('id').value,
      cpf: Number(unformatCpf(this.patientNewForm.get('cpf').value)),
      name: this.patientNewForm.get('name').value.toUpperCase(),
      phone: this.patientNewForm.get('phone').value,
      address: {
        addressName: this.patientNewForm.get('addressName').value.toUpperCase(),
        number: this.patientNewForm.get('number').value,
        district: this.patientNewForm.get('district').value.toUpperCase(),
        complement: this.patientNewForm.get('complement').value.toUpperCase(),
      }
    } as Patient;
  }

  private onSuccess(): void {
    this.snackBar.open('Paciente salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onUpdateSuccess(): void {
    this.snackBar.open('Paciente atualizado com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError(error: Error): void {
    if (error) {
      this.snackBar.open(error.detail, '', { duration: 5000 });
      return;
    }
    this.snackBar.open('Erro ao salvar paciente.', '', { duration: 5000 });
  }

  onCancel(): void {
    this.location.back();
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.patientNewForm, fieldName);
  }

  formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length <= 10) {
      // Formato para números fixos: (XX) XXXX-XXXX
      return cleaned.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      // Formato para números de celular: (XX) XXXXX-XXXX
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  }

}

import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
    this.patientNewForm.get('cpf').setValue(formatCpf(info.patient.cpf));
    this.patientNewForm.get('name').setValue(info.patient.name);
    this.patientNewForm.get('phone').setValue(info.patient.phone);
    this.patientNewForm.get('addressName').setValue(info.patient?.address?.addressName);
    this.patientNewForm.get('number').setValue(info.patient?.address?.number);
    this.patientNewForm.get('complement').setValue(info.patient?.address?.complement);
    this.patientNewForm.get('district').setValue(info.patient?.address?.district);
  }

  private patientFormBuilder(): void {
    this.patientNewForm = this.formBuilder.group({
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
    this.patientService.save(this.buildPatientObject())
      .subscribe(() => this.onSuccess(), () => this.onError());
  }

  private buildPatientObject(): Patient {
    return {
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

  private onError(): void {
    this.snackBar.open('Erro ao salvar paciente.', '', { duration: 5000 });
  }

  onCancel(): void {
    this.location.back();
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.patientNewForm, fieldName);
  }

}

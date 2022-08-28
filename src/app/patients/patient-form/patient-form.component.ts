import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../model/patient';
import { PatientService } from '../service/patient.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RgvValidations } from '../../shared/validation/rgv-validations';
import { PatientDataService } from '../service/patient-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient',
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent implements OnInit, OnDestroy {

  patientNewForm: FormGroup;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private alertService: AlertService,
    private router: Router,
    private patientDataService: PatientDataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.patientFormBuilder();
    this.subscription = this.route.data.subscribe((info: {patient: Patient}) => {
      if (info.patient) {
        this.setPatientform(info);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setPatientform(info: { patient: Patient; }): void {
    this.patientNewForm.get('cpf').setValue(info.patient.cpf);
    this.patientNewForm.get('name').setValue(info.patient.name);
    this.patientNewForm.get('phone').setValue(info.patient.phone);
    this.patientNewForm.get('addressName').setValue(info.patient?.address?.addressName);
    this.patientNewForm.get('number').setValue(info.patient?.address?.number);
    this.patientNewForm.get('complement').setValue(info.patient?.address?.complement);
    this.patientNewForm.get('district').setValue(info.patient?.address?.district);
  }

  private patientFormBuilder(): void {
    this.patientNewForm = this.formBuilder.group({
      cpf: ['', Validators.compose([
        Validators.required,
        RgvValidations.validaCpf
      ])],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      phone: [''],
      addressName: [''],
      number: [''],
      complement: [''],
      district: [''],
    });
  }

  salvar(): void {
    this.patientService.save(this.buildPatientObject())
      .subscribe(patient => {
        this.patientDataService.setPatient(patient);
        this.alertService.success(`Paciente ${patient.name} salvo com sucesso.`, true);
        this.router.navigate(['pacientes']);
      }, error => {
        if (error.error.objects) {
          const errors = error.error.objects
            .map(o => o.userMessage);
          errors.forEach(e => {
            this.alertService.danger(e, true);
          });
        } else {
          this.alertService.danger('Ocorreu um erro interno inesperado no sistema. Tente novamente e se o problema persistir, entre em contato com o administrador do sistema.', true);
        }
      });
  }

  private buildPatientObject(): Patient {
    return {
      cpf: this.patientNewForm.get('cpf').value,
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

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../model/patient';
import { PatientService } from '../service/patient.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { Router } from '@angular/router';
import { RgvValidations } from '../../shared/validation/rgv-validations';
import { PatientDataService } from '../service/patient-data.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent implements OnInit {

  patientNewForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private alertService: AlertService,
    private router: Router,
    private patientDataService: PatientDataService
  ) { }

  ngOnInit(): void {
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
      name: this.patientNewForm.get('name').value,
      phone: this.patientNewForm.get('phone').value,
      address: {
        addressName: this.patientNewForm.get('addressName').value,
        number: this.patientNewForm.get('number').value,
        district: this.patientNewForm.get('district').value,
        complement: this.patientNewForm.get('complement').value,
      }
    } as Patient;
  }

}

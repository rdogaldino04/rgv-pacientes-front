import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from './service/patient.service';
import { Patient } from './model/patient';
import { Address } from './model/address';
import { AlertService } from '../shared/components/alert/alert.service';
import { PatientDataService } from './service/patient-data.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit, OnDestroy {

  patientForm: FormGroup;
  showData = false;
  patient: Patient;
  patientNotfoundActive = false;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private patientDataService: PatientDataService
  ) { }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      cpf: ['', Validators.required]
    });
    this.patientDataService.getPatient().subscribe(patient => {
      this.showData = patient != null;
      this.patient = patient;
    });
  }

  ngOnDestroy(): void {
    this.patientDataService.setPatient(null);
  }

  search(): void {
    this.patientNotfoundActive = true;
    this.patientService.findByCpf(this.patientForm.get('cpf').value)
      .subscribe(patient => {
        this.patient = patient;
        this.showData = true;
        this.patientForm.reset();
      },
        error => {
          this.showData = false;
          this.patientForm.reset();
        });

  }

  getAddress(address: Address): string {
    return `${address?.addressName}, ${address?.number} ${address?.complement ? address?.complement : ''} ${address?.district}`;
  }

}

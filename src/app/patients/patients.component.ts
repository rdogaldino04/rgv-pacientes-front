import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../service/patient.service';
import { Patient } from './model/patient';
import { Address } from './model/address';
import { PatientDataService } from './service/patient-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, OnDestroy {

  patientForm: FormGroup;
  showData = false;
  patient: Patient;
  patientNotfoundActive = false;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private patientDataService: PatientDataService,
    private router: Router
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
    this.patientService.findByCpf(this.patientForm.get('cpf').value)
      .subscribe(patient => {
        this.patient = patient;
        this.showData = true;
        this.patientForm.reset();
        this.patientNotfoundActive = true;
        },
        error => {
          this.showData = false;
          this.patientNotfoundActive = true;
        });
  }

  getAddress(address: Address): string {
    return `${address?.addressName}, ${address?.number} ${address?.complement ? address?.complement : ''} ${address?.district}`;
  }

  newPatient(): void {
    this.router.navigate(['pacientes', 'novo']);
  }

}

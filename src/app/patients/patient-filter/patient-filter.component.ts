import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import { PatientDataService } from '../patient-data.service';
import { Address } from 'src/app/model/address';

@Component({
    selector: 'app-patient-filter',
    templateUrl: './patient-filter.component.html',
    styleUrls: ['./patient-filter.component.scss']
})
export class PatientFilterComponent implements OnInit, OnDestroy {

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

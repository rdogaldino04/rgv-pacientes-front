import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import { PatientDataService } from '../patient-data.service';
import { Address } from 'src/app/model/address';
import { PatientFilter } from 'src/app/model/patient-filter';

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

    @Output() refresh = new EventEmitter(false);

    constructor(
        private formBuilder: FormBuilder,
        private patientService: PatientService,
        private patientDataService: PatientDataService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.patientForm = this.formBuilder.group({
            cpf: [''],
            name: ['']
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
        this.refresh.emit({
            cpf: this.patientForm.get('cpf').value,
            name: this.patientForm.get('name').value
        });
    }

    getAddress(address: Address): string {
        return `${address?.addressName}, ${address?.number} ${address?.complement ? address?.complement : ''} ${address?.district}`;
    }

}

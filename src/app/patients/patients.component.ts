import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from './patient.service';
import { Patient } from './model/patient';
import { Address } from './model/address';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {

  patientForm: FormGroup;
  showData = false;
  patient: Patient;
  cpfFormatadoValue: string;
  patientNotfoundActive = false;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      cpf: ['', Validators.required]
    });
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

  getCpf(cpf: number): string {
    const cpfStr = cpf.toString();
    const cpfResult = `${cpfStr.substring(0, 3)}.${cpfStr.substring(3, 6)}.${cpfStr.substring(6, 9)}.${cpfStr.substring(9, 11)}`;
    return cpfResult;
  }

  getAddress(address: Address): string {
    return `${address?.addressName}, ${address?.number} ${address?.complement ? address?.complement : ''} ${address?.district}`;
  }

}

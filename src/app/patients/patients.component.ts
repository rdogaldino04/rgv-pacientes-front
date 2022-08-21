import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientService } from './patient.service';
import { Patient } from './patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {

  patientForm: FormGroup;
  showData = false;
  patient: Patient;

  constructor(private formBuilder: FormBuilder, private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      cpf: [''],
      name: ['']
    })
  }

  search() {
    this.patientService.findByCpf(this.patientForm.get('cpf').value)
      .subscribe(patient => {
        this.patient = patient;
        this.showData = true;
      },
      error => this.showData = false
      );

  }

  getCpf(cpf: number): string {
    let cpfStr = cpf.toString();
    let cpfResult = `${cpfStr.substring(0, 3)}.${cpfStr.substring(3, 6)}.${cpfStr.substring(6, 9)}.${cpfStr.substring(9, 11)}`;
    return cpfResult;
  }

}

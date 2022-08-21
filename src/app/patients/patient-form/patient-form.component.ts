import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Patient } from '../model/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent implements OnInit {

  patientNewForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.patientNewForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  salvar(): void {
    const patient = this.patientNewForm.getRawValue() as Patient;
    console.log(patient)
  }

}

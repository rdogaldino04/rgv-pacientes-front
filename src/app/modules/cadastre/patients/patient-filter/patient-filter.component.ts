import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Patient } from 'src/app/model/patient';
import { PatientDataService } from '../patient-data.service';
import { Address } from 'src/app/model/address';
import { unformatCpf } from 'src/app/shared/utils/cpf-utils';

@Component({
  selector: 'app-patient-filter',
  templateUrl: './patient-filter.component.html',
  styleUrls: ['./patient-filter.component.scss'],
})
export class PatientFilterComponent implements OnInit, OnDestroy {
  patientForm: UntypedFormGroup;
  showData = false;
  patient: Patient;
  patientNotfoundActive = false;

  @Output() refresh = new EventEmitter(false);

  constructor(
    private formBuilder: UntypedFormBuilder,
    private patientDataService: PatientDataService
  ) {}

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      cpf: ['', [Validators.minLength(14), Validators.maxLength(14)]],
      name: [''],
      size: [5],
      page: [0],
    });
    this.patientDataService.getPatient().subscribe((patient) => {
      this.showData = patient != null;
      this.patient = patient;
    });
  }

  ngOnDestroy(): void {
    this.patientDataService.setPatient(null);
  }

  search(): void {
    this.refresh.emit({
      cpf: unformatCpf(
        this.patientForm.get('cpf').value
          ? this.patientForm.get('cpf').value
          : ''
      ),
      name: this.patientForm.get('name').value,
    });
  }

  getAddress(address: Address): string {
    return `${address?.addressName}, ${address?.number} ${
      address?.complement ? address?.complement : ''
    } ${address?.district}`;
  }

  cancel(): void {
    this.patientForm.reset();
    this.refresh.emit({});
  }
}

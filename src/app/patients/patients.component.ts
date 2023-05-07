import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { PatientPage } from '../model/patient-page';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PatientFilter } from '../model/patient-filter';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patientPage$: Observable<PatientPage> | null = null;

  constructor(private patientService: PatientService) { 
    this.onRefresh();
  }

  ngOnInit(): void {
  }

  onRefresh(filter?: PatientFilter): void {
    this.patientPage$ = this.patientService.getAllWithPaginate(filter)
      .pipe(catchError(error => {
        console.log(error)
        return of(new PatientPage);
      }));
  }

}

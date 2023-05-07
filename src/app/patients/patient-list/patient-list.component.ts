import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PatientPage } from 'src/app/model/patient-page';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {

    readonly displayedColumns = ['CPF', 'Name', 'actions'];

    @Input() patientPage: PatientPage = new PatientPage();

    constructor(private router: Router) {}

    onAdd(): void {
        this.router.navigate(['pacientes', 'novo']);
    }

}

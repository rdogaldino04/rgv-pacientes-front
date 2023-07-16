import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientPage } from 'src/app/model/patient-page';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

    readonly displayedColumns = ['CPF', 'Nome', 'ações'];

    length = 9;
    pageSize = 6;
    pageSizeOptions = [5, 10, 50, 100];

    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

    @Input() patientPage: PatientPage = new PatientPage();
    @Output() add = new EventEmitter(false);
    @Output() edit = new EventEmitter(false);
    @Output() remove = new EventEmitter(false);
    @Output() pageInfo = new EventEmitter(false);

    constructor() { }

    ngOnInit(): void { }

    onAdd(): void {
        this.add.emit();
    }

    onEdit(patient: Patient): void {
        this.edit.emit(patient);
    }

    onDelete(patient: Patient): void {
        this.remove.emit(patient);
    }

    onPageInfo(pageEvent: PageEvent): void {
        this.pageInfo.emit(pageEvent);
    }

}

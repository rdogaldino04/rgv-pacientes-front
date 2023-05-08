import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { PatientPage } from '../model/patient-page';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PatientFilter } from '../model/patient-filter';
import { Patient } from '../model/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patientPage$: Observable<PatientPage> | null = null;
  filter?: PatientFilter;
  
  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.onRefresh(this.filter);
  }

  ngOnInit(): void {
    this.filter = {};
  }

  onRefresh(filter?: PatientFilter): void {
    this.filter = filter;
    this.patientPage$ = this.patientService.getAllWithPaginate(this.filter)
      .pipe(catchError(error => {
        console.log(error)
        return of(new PatientPage);
      }));
  }

  onAdd(): void {
    this.router.navigate(['pacientes', 'new']);
  }

  onEdit(patient: Patient): void {
    this.router.navigate(['edit', patient.cpf], { relativeTo: this.route });
  }

  onRemove(patient: Patient): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse paciente?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.patientService.delete(patient.cpf).subscribe(() => {          
          this.onRefresh(this.filter);
          this.snackBar.open('Paciente removido com sucesso!', 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }, () => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }

  onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onPageInfo(pageEvent: PageEvent): void {
    this.filter.size = pageEvent.pageSize;
    this.filter.page = pageEvent.pageIndex;
    this.onRefresh(this.filter)
  }

}

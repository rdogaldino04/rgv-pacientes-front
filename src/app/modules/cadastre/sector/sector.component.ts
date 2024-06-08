import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorPage } from 'src/app/model/sector-page';
import { SectorService } from 'src/app/service/sector.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
})
export class SectorComponent implements OnInit {
  sectorPage: SectorPage | null = null;
  sectorFilterform: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sectorService: SectorService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.sectorPage = data.sectorPage;
    });
    this.sectorFilterform = this.formBuilder.group({
      id: [null],
      name: [null],
      size: [null],
      page: [null],
      company: [null],
    });
  }

  onPageInfo(pageEvent: PageEvent): void {
    this.sectorFilterform.get('size').setValue(pageEvent.pageSize);
    this.sectorFilterform.get('page').setValue(pageEvent.pageIndex);
    this.sectorService
      .getAll({ size: pageEvent.pageSize, page: pageEvent.pageIndex })
      .subscribe((sectorPage) => {
        this.sectorPage = sectorPage;
      });
  }

  onFilter(): void {
    this.sectorService
      .getAll(this.sectorFilterform.getRawValue())
      .subscribe((sectorPage) => {
        this.sectorPage = sectorPage;
      });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o setor?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.sectorService.delete(id).subscribe(
          () => {
            this.onFilter();
          },
          (e) => {
            if (e?.status === 400 || e?.status === 404) {
              this.snackBar.open(e?.error?.userMessage, '', { duration: 5000 });
            } else {
              this.snackBar.open('Erro ao excluir o lote', '', {
                duration: 5000,
              });
            }
          }
        );
      }
    });
  }

  onCreate(): void {
    this.router.navigate(['cadastros/sectors', 'new']);
  }

  onUpdate(id: number): void {
    this.router.navigate(['cadastros/sectors', 'edit', id]);
  }
}

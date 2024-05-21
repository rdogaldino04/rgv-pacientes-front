import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BatchPage } from 'src/app/model/batch-page';
import { BatchService } from 'src/app/service/batch.service';

@Component({
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
})
export class BatchComponent implements OnInit {
  batchPage$: Observable<BatchPage> | null = null;
  batchFilterform: UntypedFormGroup;

  constructor(
    private batchService: BatchService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.batchPage$ = this.batchService.findAll({
      id: 0,
      batchNumber: '',
      page: 0,
      size: 5,
    });
    this.batchFilterform = this.formBuilder.group({
      id: [null],
      batchNumber: [null],
      size: [null],
      page: [null],
      product: [null],
    });
  }

  onFilter(): void {
    this.batchPage$ = this.batchService.findAll(
      this.batchFilterform.getRawValue()
    );
  }

  onCreate(): void {
    this.router.navigate(['cadastros/batchies', 'new']);
  }

  onUpdate(id: number): void {
    this.router.navigate(['cadastros/batchies', 'edit', id]);
  }

  onDelete(id: number) {
    this.batchService.delete(id).subscribe(
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

  onPageInfo(pageEvent: PageEvent): void {
    this.batchFilterform.get('size').setValue(pageEvent.pageSize);
    this.batchFilterform.get('page').setValue(pageEvent.pageIndex);
    this.batchPage$ = this.batchService.findAll(
      this.batchFilterform.getRawValue()
    );
  }
}

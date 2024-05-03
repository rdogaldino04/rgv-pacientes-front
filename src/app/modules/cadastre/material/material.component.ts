import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialFilter } from 'src/app/model/material-filter';
import { MaterialPage } from 'src/app/model/material-page';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
})
export class MaterialComponent implements OnInit {
  materialPage$: Observable<MaterialPage> | null = null;
  materialFilterform: UntypedFormGroup;

  constructor(
    private materialService: MaterialService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.materialPage$ = this.materialService.getMaterialsByFilter({
      id: 0,
      name: '',
      page: 0,
      size: 5,
    });
    this.materialFilterform = this.formBuilder.group({
      id: [null],
      name: [null],
      size: [null],
      page: [null],
    });
  }

  onFilter(): void {
    this.materialPage$ = this.materialService.getMaterialsByFilter(
      this.materialFilterform.getRawValue() as MaterialFilter
    );
  }

  onCreate(): void {
    this.router.navigate(['cadastros/materials', 'new']);
  }

  onUpdate(id: number): void {
    this.router.navigate(['cadastros/materials', 'edit', id]);
  }

  onDelete(id: number) {
    this.materialService.delete(id).subscribe(() => this.onFilter());
  }

  onPageInfo(pageEvent: PageEvent): void {
    this.materialFilterform.get('size').setValue(pageEvent.pageSize);
    this.materialFilterform.get('page').setValue(pageEvent.pageIndex);
    this.materialPage$ = this.materialService.getMaterialsByFilter(
      this.materialFilterform.getRawValue() as MaterialFilter
    );
  }
}

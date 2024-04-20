import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Material } from 'src/app/model/material';
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
    this.materialPage$ = this.materialService.getAll({ id: 0, name: '' });
    this.materialFilterform = this.formBuilder.group({
      id: [null],
      name: [null],
    });
  }

  onFilter(): void {
    this.materialPage$ = this.materialService.getAll(
      this.materialFilterform.getRawValue() as Material
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
}

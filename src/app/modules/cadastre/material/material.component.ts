import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Material } from "src/app/model/material";
import { MaterialService } from "src/app/service/material.service";

@Component({
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent {

  materials$: Observable<Material[]> | null = null;
  materialFilterform: UntypedFormGroup;

  constructor(private materialService: MaterialService,
    private formBuilder: UntypedFormBuilder) {
    this.materials$ = this.materialService.getAll({ id: 0, name: ''});

    this.materialFilterform = this.formBuilder.group({
      id: [null],
      name: [null]
    });
  }

  onFilter() {
    this.materials$ = this.materialService.getAll(this.materialFilterform.getRawValue() as Material);
  }

}

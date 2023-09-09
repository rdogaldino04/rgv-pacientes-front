import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Material } from "src/app/model/material";
import { MaterialService } from "src/app/service/material.service";

@Component({
    selector: 'app-medicaments',
    templateUrl: './material.component.html',
  })
export class MaterialComponent {

  materials$: Observable<Material[]> | null = null;

  constructor(private materialService: MaterialService) {
    this.materials$ = this.materialService.getAll('');
  }

}

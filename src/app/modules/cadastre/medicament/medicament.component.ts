import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Material } from "src/app/model/material";
import { MaterialService } from "src/app/service/material.service";

@Component({
    selector: 'app-medicaments',
    templateUrl: './medicament.component.html',
  })
export class MedicamentComponent {

  materials$: Observable<Material[]> | null = null;

  constructor(private materialService: MaterialService) {
    this.materials$ = this.materialService.getAll();
  }

}

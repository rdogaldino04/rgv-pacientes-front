import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Medicament } from "src/app/model/madicament";
import { MedicamentService } from "src/app/service/medicament.service";

@Component({
    selector: 'app-medicaments',
    templateUrl: './medicament.component.html',
  })
export class MedicamentComponent {

  medicaments$: Observable<Medicament[]> | null = null;

  constructor(private medicamentService: MedicamentService) {
    this.medicaments$ = this.medicamentService.getAll();
  }

}

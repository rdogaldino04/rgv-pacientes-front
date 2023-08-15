import { Component, Input } from "@angular/core";
import { Material } from "src/app/model/material";

@Component({
    selector: 'app-medicament-list',
    templateUrl: './medicament-list.component.html',
})
export class MedicamentListComponent {

    readonly displayedColumns = ['ID'];
    @Input() medicaments: Material[] = [];

    constructor() {
        console.log(this.medicaments)
    }
    
    
}
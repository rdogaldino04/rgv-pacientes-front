import { Component, Input } from "@angular/core";
import { Medicament } from "src/app/model/madicament";

@Component({
    selector: 'app-medicament-list',
    templateUrl: './medicament-list.component.html',
})
export class MedicamentListComponent {

    readonly displayedColumns = ['ID'];
    @Input() medicaments: Medicament[] = [];

    constructor() {
        console.log(this.medicaments)
    }
    
    
}
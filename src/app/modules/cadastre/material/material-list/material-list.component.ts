import { Component, Input } from "@angular/core";
import { Material } from "src/app/model/material";

@Component({
    selector: 'app-material-list',
    templateUrl: './material-list.component.html',
})
export class MaterialListComponent {

    readonly displayedColumns = ['ID'];
    @Input() materials: Material[] = [];

    constructor() {
        console.log(this.materials)
    }
    
    
}
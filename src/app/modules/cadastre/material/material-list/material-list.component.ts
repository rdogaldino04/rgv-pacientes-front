import { Component, Input } from "@angular/core";
import { Material } from "src/app/model/material";

@Component({
    selector: 'app-material-list',
    templateUrl: './material-list.component.html',
    styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent {

    readonly displayedColumns = ['id', 'name',];
    @Input() materials: Material[] = [];
    
}
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Material } from "src/app/model/material";

@Component({
    selector: 'app-material-list',
    templateUrl: './material-list.component.html',
    styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent {

    readonly displayedColumns = ['id', 'name', 'expirationDate', 'registrationDate', 'ações'];
    @Input() materials: Material[] = [];

    @Output() eventCreate$ = new EventEmitter();
    @Output() eventUpdate$ = new EventEmitter();
    @Output() eventDelete$ = new EventEmitter();

}
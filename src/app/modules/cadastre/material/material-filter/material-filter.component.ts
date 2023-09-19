import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Material } from "src/app/model/material";

@Component({
  selector: 'app-material-filter',
  templateUrl: './material-filter.component.html',
})
export class MaterialFilterComponent {

  @Input() materialFilterform: UntypedFormGroup;
  @Output() eventFilter$ = new EventEmitter();
  materials$: Observable<Material[]> | null = null;

  search() {
    this.eventFilter$.emit();
  }

}

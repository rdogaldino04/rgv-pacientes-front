import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-sector-filter',
  templateUrl: './sector-filter.component.html',
  styleUrls: ['./sector-filter.component.scss'],
})
export class SectorFilterComponent {
  @Input() sectorFilterform: UntypedFormGroup;
  @Output() eventFilter$ = new EventEmitter();

  search(): void {
    this.eventFilter$.emit();
  }

  cancel(): void {
    this.sectorFilterform.reset();
    this.eventFilter$.emit();
  }
}

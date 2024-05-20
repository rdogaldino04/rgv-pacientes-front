import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-batch-filter',
  templateUrl: './batch-filter.component.html',
  styles: [
    `
      .rgv-ml-8 {
        margin-left: 8px;
      }
    `,
  ],
})
export class BatchFilterComponent {
  @Input() batchFilterform: UntypedFormGroup;
  @Output() eventFilter$ = new EventEmitter();

  search() {
    this.eventFilter$.emit();
  }
}

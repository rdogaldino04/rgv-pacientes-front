import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss'],
})
export class CompanyFilterComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Output() eventFilter$ = new EventEmitter();

  ngOnInit(): void {}

  search(): void {
    this.eventFilter$.emit();
  }

  cancel() {
    this.form.reset();
    this.eventFilter$.emit();
  }
}

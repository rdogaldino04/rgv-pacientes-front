import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
})
export class ProductFilterComponent {
  @Input() productFilterform: UntypedFormGroup;
  @Output() eventFilter$ = new EventEmitter();
  products$: Observable<Product[]> | null = null;

  search() {
    this.eventFilter$.emit();
  }
}

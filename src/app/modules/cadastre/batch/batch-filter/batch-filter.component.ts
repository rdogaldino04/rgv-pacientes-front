import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { Observable, ReplaySubject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeAll,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

const EXPECTED_DIGITATION = 300;

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
export class BatchFilterComponent implements OnInit {
  @Input() batchFilterform: UntypedFormGroup;
  @Output() eventFilter$ = new EventEmitter();

  products$: Observable<Product[]>;
  productAll$ = of([]);
  filteredOptionsProducts$: Observable<Product[]>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.configAutocompleteProduct(this.batchFilterform);
  }

  search(): void {
    this.eventFilter$.emit();
  }

  displayFnProduct(product: Product): string {
    return product?.name;
  }

  private configAutocompleteProduct(form: FormGroup) {
    this.filteredOptionsProducts$ = form.get('product').valueChanges.pipe(
      takeUntil(this.destroyed$),
      startWith(''),
      debounceTime(EXPECTED_DIGITATION),
      filter(
        (valueDigited) =>
          valueDigited && (valueDigited.length >= 3 || !valueDigited.length)
      ),
      distinctUntilChanged(),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name;
      }),
      switchMap((valueDigited) =>
        this.productService
          .getProductByFilter({ name: valueDigited })
          .pipe(map((productPage) => productPage.content))
      )
    );

    this.products$ = of(this.productAll$, this.filteredOptionsProducts$).pipe(
      takeUntil(this.destroyed$),
      mergeAll()
    );
  }
}

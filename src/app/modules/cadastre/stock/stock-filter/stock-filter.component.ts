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
import { Sector } from 'src/app/model/sector';
import { SectorService } from 'src/app/service/sector.service';
import { EXPECTED_DIGITATION } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-stock-filter',
  templateUrl: './stock-filter.component.html',
  styleUrls: ['./stock-filter.component.scss'],
})
export class StockFilterComponent implements OnInit {
  @Input() stockFilterform: UntypedFormGroup;
  @Output() eventFilter$ = new EventEmitter();

  sectors$: Observable<Sector[]>;
  sectorAll$ = of([]);
  filteredOptionsSectors$: Observable<Sector[]>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private sectorService: SectorService) {}

  ngOnInit(): void {
    this.configAutocompleteProduct(this.stockFilterform);
  }

  search(): void {
    this.eventFilter$.emit();
  }

  cancel() {
    this.stockFilterform.reset();
    this.eventFilter$.emit();
  }

  private configAutocompleteProduct(form: FormGroup) {
    this.filteredOptionsSectors$ = form.get('sector').valueChanges.pipe(
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
        this.sectorService
          .getAll({ name: valueDigited })
          .pipe(map((SectorPage) => SectorPage.content))
      )
    );

    this.sectors$ = of(this.sectorAll$, this.filteredOptionsSectors$).pipe(
      takeUntil(this.destroyed$),
      mergeAll()
    );
  }

  displayFnSector(sector: Sector) {
    return sector?.name;
  }
}

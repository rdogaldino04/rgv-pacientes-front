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
import { Company } from 'src/app/model/company';
import { CompanyService } from 'src/app/service/company.service';
import { EXPECTED_DIGITATION } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-sector-filter',
  templateUrl: './sector-filter.component.html',
  styleUrls: ['./sector-filter.component.scss'],
})
export class SectorFilterComponent implements OnInit {
  @Input() sectorFilterform: UntypedFormGroup;
  @Output() eventFilter$ = new EventEmitter();

  companies$: Observable<Company[]>;
  companyAll$ = of([]);
  filteredOptionsCompanies$: Observable<Company[]>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.configAutocompleteCompany(this.sectorFilterform);
  }

  private configAutocompleteCompany(form: FormGroup) {
    this.filteredOptionsCompanies$ = form.get('company').valueChanges.pipe(
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
        this.companyService
          .getAll({ name: valueDigited })
          .pipe(map((companyPage) => companyPage.content))
      )
    );

    this.companies$ = of(this.companyAll$, this.filteredOptionsCompanies$).pipe(
      takeUntil(this.destroyed$),
      mergeAll()
    );
  }

  displayFnCompany(company: Company): string {
    return company?.name;
  }

  search(): void {
    this.eventFilter$.emit();
  }

  cancel(): void {
    this.sectorFilterform.reset();
    this.eventFilter$.emit();
  }
}

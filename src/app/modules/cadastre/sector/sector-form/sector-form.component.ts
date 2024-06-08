import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, Subscription, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeAll,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Company } from 'src/app/model/company';
import { Error } from 'src/app/model/error';
import { Sector } from 'src/app/model/sector';
import { CompanyService } from 'src/app/service/company.service';
import { SectorService } from 'src/app/service/sector.service';
import { EXPECTED_DIGITATION } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.scss'],
})
export class SectorFormComponent implements OnInit {
  @Input() requireSelection: boolean = false;
  companyControl = new FormControl();
  form!: FormGroup;
  subscription: Subscription;

  companies$: Observable<Company[]>;
  companyAll$ = of([]);
  filteredOptionsCompanies$: Observable<Company[]>;
  companies: Company[] = [];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private sectorService: SectorService,
    private snackBar: MatSnackBar,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe(
      (info: { sector: Sector }) => {
        this.sectorFormBuilder(
          info.sector
            ? info.sector
            : {
                id: null,
                name: null,
                company: { id: null, name: null },
              }
        );
      }
    );
  }

  private sectorFormBuilder(sector: Sector) {
    this.form = this.formBuilder.group({
      id: [sector?.id],
      name: [sector?.name, [Validators.required]],
      company: [sector?.company, [Validators.required]],
      companyName: [sector?.company?.name, [Validators.required]],
    });
    this.configAutocompleteCompany(this.form);
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
        this.companyService.getAll({ name: valueDigited }).pipe(
          tap((companyPage) => {
            this.companies = companyPage.content;
            this.changeDetectorRef.detectChanges();
          }),
          map((companyPage) => companyPage.content)
        )
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

  onCompanySelected(event: MatAutocompleteSelectedEvent): void {
    const { name } = event.option.value;
    this.form.get('companyName').setValue(name);
  }

  onSubmit(): void {
    if (this.form.controls.id.value != null) {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    this.sectorService.create(this.form.getRawValue() as Sector).subscribe(
      () => this.onSuccess(),
      (response) => this.onError(response.error)
    );
  }

  private update(): void {
    this.sectorService.update(this.form.getRawValue() as Sector).subscribe(
      () => this.onSuccess(),
      (response) => this.onError(response.error)
    );
  }

  private onError(error: Error): void {
    if (error) {
      this.snackBar.open(error.detail, '', { duration: 5000 });
      return;
    }
    this.snackBar.open('Erro ao salvar lote.', '', { duration: 5000 });
  }

  private onSuccess(): void {
    this.snackBar.open('Lote salvo com sucesso!', '', { duration: 5000 });
    this.location.back();
  }
}

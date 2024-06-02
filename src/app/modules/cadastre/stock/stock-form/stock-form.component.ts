import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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
} from 'rxjs/operators';
import { Sector } from 'src/app/model/sector';
import { Stock } from 'src/app/model/stock';
import { SectorService } from 'src/app/service/sector.service';
import { StockService } from 'src/app/service/stock.service';

const EXPECTED_DIGITATION = 300;

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss'],
})
export class StockFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription: Subscription | undefined;

  sectors$: Observable<Sector[]>;
  sectorAll$ = of([]);
  filteredOptionsSectors$: Observable<Sector[]>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar,
    private stockService: StockService,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((info: { stock: Stock }) => {
      this.stockFormBuilder(info.stock ? info.stock : {});
    });
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

  private stockFormBuilder(stock: Stock): void {
    this.form = this.formBuilder.group({
      id: [stock.id],
      name: [stock.name, [Validators.required]],
      sector: [stock.sector, [Validators.required]],
    });
    this.configAutocompleteProduct(this.form);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.value.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create(): void {
    this.stockService.create(this.form.getRawValue()).subscribe(
      () => {
        this.onSuccess();
      },
      (e) => {
        if (e.status === 400 || e.status === 404) {
          if (e.error && e.error.objects) {
            this.onError(e);
          } else {
            this.snackBar.open('Erro ao salvar a empresa!', '', {
              duration: 5000,
            });
          }
        }
      }
    );
  }

  update(): void {
    this.stockService.update(this.form.getRawValue()).subscribe(
      () => {
        this.onSuccess();
      },
      (e) => {
        if (e.status === 400 || e.status === 404) {
          if (e.error && e.error.objects) {
            this.onError(e);
          } else {
            this.snackBar.open('Erro ao salvar a empresa!', '', {
              duration: 5000,
            });
          }
        }
      }
    );
  }

  onError(e: any): void {
    e?.error?.objects.forEach((messageError) => {
      this.snackBar.open(
        `${messageError?.name} ${messageError?.userMessage}`,
        'Erro',
        {
          duration: 5000,
        }
      );
    });
  }

  onSuccess(): void {
    this.snackBar.open('Estoque salvo com sucesso!', '', {
      duration: 5000,
    });
    this.location.back();
  }

  displayFnSector(sector: Sector) {
    return sector?.name;
  }
}

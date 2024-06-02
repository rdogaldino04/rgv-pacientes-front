import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StockPage } from 'src/app/model/stock-page';
import { StockService } from 'src/app/service/stock.service';

@Injectable({
  providedIn: 'root',
})
export class StockPageResolver {
  constructor(private stockService: StockService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): StockPage | Observable<StockPage> | Promise<StockPage> {
    return this.stockService.getStockByFilter({ size: 5, page: 0 });
  }
}

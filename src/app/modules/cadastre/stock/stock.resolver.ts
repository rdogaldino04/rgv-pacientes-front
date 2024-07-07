import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/service/stock.service';

@Injectable({ providedIn: 'root' })
export class StockResolver {
  constructor(private stockService: StockService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Stock | Observable<Stock> | Promise<Stock> {
    const key = 'id';
    const id = route.params[key];
    return this.stockService.findById(id);
  }
}

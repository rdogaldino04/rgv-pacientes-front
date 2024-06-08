import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SectorPage } from 'src/app/model/sector-page';
import { SectorService } from 'src/app/service/sector.service';

@Injectable({
  providedIn: 'root',
})
export class SectorPageResolver {
  constructor(private sectorService: SectorService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): SectorPage | Observable<SectorPage> | Promise<SectorPage> {
    return this.sectorService.getAll({ size: 5, page: 0 });
  }
}

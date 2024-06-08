import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Sector } from 'src/app/model/sector';
import { SectorService } from 'src/app/service/sector.service';

@Injectable({ providedIn: 'root' })
export class SectorResolver {
  constructor(private sectorService: SectorService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Sector | Observable<Sector> | Promise<Sector> {
    const key = 'id';
    const id = route.params[key];
    return this.sectorService.findById(id);
  }
}

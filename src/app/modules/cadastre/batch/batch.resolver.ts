import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Batch } from 'src/app/model/batch';
import { BatchService } from 'src/app/service/batch.service';

@Injectable({ providedIn: 'root' })
export class BatchResolver {
  constructor(private batchService: BatchService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Batch | Observable<Batch> | Promise<Batch> {
    const key = 'id';
    const id = route.params[key];
    return this.batchService.findById(id);
  }
}

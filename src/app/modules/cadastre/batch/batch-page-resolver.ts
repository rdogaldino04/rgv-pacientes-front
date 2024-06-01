import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BatchPage } from 'src/app/model/batch-page';
import { BatchService } from 'src/app/service/batch.service';

@Injectable({
  providedIn: 'root',
})
export class BatchPageResolver {
  constructor(private batchService: BatchService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): BatchPage | Observable<BatchPage> | Promise<BatchPage> {
    return this.batchService.findAll({ size: 5, page: 0 });
  }
}

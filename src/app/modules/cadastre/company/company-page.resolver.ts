import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyPage } from 'src/app/model/company-page';
import { CompanyService } from 'src/app/service/company.service';

@Injectable({ providedIn: 'root' })
export class CompanyPageResolver {
  constructor(private companyService: CompanyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CompanyPage | Observable<CompanyPage> | Promise<CompanyPage> {
    return this.companyService.getAll({});
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company';
import { CompanyService } from 'src/app/service/company.service';

@Injectable({ providedIn: 'root' })
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Company | Observable<Company> | Promise<Company> {
    const key = 'id';
    const id = route.params[key];
    return this.companyService.findById(Number(id));
  }
}

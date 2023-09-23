import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Material } from 'src/app/model/material';
import { MaterialService } from 'src/app/service/material.service';

@Injectable({ providedIn: 'root' })
export class MaterialResolver {

  constructor(private materialService: MaterialService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Material | Observable<Material> | Promise<Material> {
    const key = 'id';
    const id = route.params[key];
    return this.materialService.findById(id);
  }

}

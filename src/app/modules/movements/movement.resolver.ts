import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Movement } from 'src/app/model/movement';
import { MovementService } from 'src/app/service/movement.service';

@Injectable()
export class MovementResolver {

  constructor(private movementService: MovementService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Movement | Observable<Movement> | Promise<Movement> {
    const key = 'id';
    const id = route.params[key];
    return this.movementService.findById(Number(id));
  }

}

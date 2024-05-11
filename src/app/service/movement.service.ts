import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movement } from '../model/movement';
import { first } from 'rxjs/operators';
import { MovementInput } from '../model/movement-input';

const API = environment.BASE_API;

@Injectable({ providedIn: 'root' })
export class MovementService {
  constructor(private http: HttpClient) {}

  findById(id: number): Observable<Movement> {
    return this.http.get<Movement>(`${API}/movements/${id}`);
  }

  save(movementInput: MovementInput): Observable<Movement> {
    return this.http
      .post<Movement>(`${API}/movements`, movementInput)
      .pipe(first());
  }
}

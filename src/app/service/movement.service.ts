import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movement } from '../model/movement';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class MovementService {

    constructor(private http: HttpClient) { }

    findById(id: number): Observable<Movement> {
        const movements = [
            {
                id: 1,
                patient: { id: 15, cpf: 23268785409, name: 'ANA MARIA CHAVES' },
                company: { id: 1, cnpj: 71563285000117, name: 'PSICOLOGIA INÁCIO' },
                sector: { id: 1, name: 'SETOR_1' },
                stock: { id: 1, name: 'ESTOQUE_1' },
                items: [
                    { id: 1, material: { id: 1, name: 'LOSARTANA POTÁSSICA 50 MG COMPRIMIDO ', expirationDate: null, registrationDate: null }, amount: 15 },
                    { id: 2, material: { id: 2, name: 'METFORMINA, CLORIDRATO 500 MG COMPRIMIDO', expirationDate: null, registrationDate: null }, amount: 16 },
                ]
            }
        ] as Movement[];

        const movement = movements.filter(m => m.id === id)[0];
        return of(movement);
    }

}

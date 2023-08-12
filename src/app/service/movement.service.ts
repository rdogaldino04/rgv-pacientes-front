import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicament } from '../model/madicament';
import { Movement } from '../model/movement';
import { Patient } from '../model/patient';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class MovementService {

    constructor(private http: HttpClient) { }

    findById(id: number): Observable<Movement> {
        const movements = [
            {
                id: 1,
                patient: { cpf: 82423862776, name: 'Ivone Lucio Mendes Batista' } as Patient,
                company: { cnpj: 71563285000117, name: 'Psicologia Inácio' },
                sector: { id: 1, name: 'Setor 1' },
                stock: { id: 1, name: 'Estoque 10' },
                items: [
                    //{id: 1, name: 'A1', amount: 15}
                ]
            }
        ] as Movement[];

        const movement = movements.filter(m => m.id === id)[0];
        return of(movement);
    }

}

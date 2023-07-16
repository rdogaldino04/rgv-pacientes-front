import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicament } from '../model/madicament';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class MedicamentService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Medicament[]> {
        const medicaments = [
            { id: 1, name: 'Glifage', expirationDate: null, registrationDate: null },
            { id: 2, name: 'Glifage2', expirationDate: null, registrationDate: null },
            { id: 3, name: 'Glifage3', expirationDate: null, registrationDate: null }
        ];

        return of(medicaments);
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../model/material';
import { tap } from 'rxjs/operators';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class MaterialService {

    private materials: Material[] = [
        { id: 1, name: 'LOSARTANA POTÁSSICA 50 MG COMPRIMIDO ', expirationDate: null, registrationDate: null },
        { id: 2, name: 'METFORMINA, CLORIDRATO 500 MG COMPRIMIDO', expirationDate: null, registrationDate: null },
        { id: 3, name: 'LORATADINA 1 MG/ML XAROPE  100 ML', expirationDate: null, registrationDate: null }
    ]

    constructor(private http: HttpClient) { }

    getAll(): Observable<Material[]> {
        return of(this.materials);
    }

    findById(id: number): Observable<Material> {
        return of(this.materials.filter(material => material.id === id)[0]);
    }

}

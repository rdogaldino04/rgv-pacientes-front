import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../model/material';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class MaterialService {

    private url = `${API}/materials`;

    constructor(private http: HttpClient) { }

    getAll(name: string): Observable<Material[]> {
        return this.http.get<Material[]>(`${this.url}?name=${name}`);
    }

}

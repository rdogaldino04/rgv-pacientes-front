import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../model/material';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class MaterialService {

    private url = `${API}/materials`;

    constructor(private http: HttpClient) { }

    getAll(materialFilter: Material): Observable<Material[]> {
        const params = new HttpParams()
            .append('id', materialFilter.id ? materialFilter.id : '')
            .append('name', materialFilter.name ? materialFilter.name : '');
        return this.http.get<Material[]>(`${this.url}`, { params });
    }

}

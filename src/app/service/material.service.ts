import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../model/material';
import { MaterialPage } from '../model/material-page';
import { MaterialFilter } from '../model/material-filter';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class MaterialService {
  private url = `${API}/materials`;

  constructor(private http: HttpClient) {}

  getMaterialsByFilter(
    materialFilter: MaterialFilter
  ): Observable<MaterialPage> {
    const params = new HttpParams()
      .append('id', materialFilter.id ? materialFilter.id : '')
      .append('name', materialFilter.name ? materialFilter.name : '')
      .append('size', materialFilter.size ? String(materialFilter.size) : '')
      .append('page', materialFilter.size ? String(materialFilter.page) : '');
    return this.http.get<MaterialPage>(`${this.url}`, { params });
  }

  findById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.url}/${id}`);
  }

  update(material: Material): Observable<Material> {
    return this.http.put<Material>(`${this.url}/${material.id}`, material);
  }

  create(material: Material): Observable<Material> {
    return this.http.post<Material>(`${this.url}`, material);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

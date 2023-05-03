import { Injectable } from '@angular/core';
import { Menu } from '../menu';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class MenuService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Menu[]> {
        return this.http.get<Menu[]>(`${API}/menus`);
    }

}

import { Injectable } from '@angular/core';
import { Menu } from '../../shared/components/rgv-navbar/menu';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class MenuService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Menu[]> {
        return this.http.get<Menu[]>(`${API}/menus`);
        /*return [
            { id: 1, name: 'Home', active: true, url: '', subMenus: [], menuParent: null },
            {
                id: 2, name: 'Cadastros', active: false, url: '', subMenus: [
                    { id: 4, name: 'Pacientes', active: false, url: 'pacientes', subMenus: [], menuParent: { id: 2, name: '', active: true } },
                    { id: 5, name: 'Plano de saúde', active: false, url: '', subMenus: [], menuParent: {id: 2, name: '', active: true } }
                ]
                , menuParent: null
            },
            { id: 3, name: 'Atendimentos', active: false, url: '', subMenus: [], menuParent: null },
        ];*/
    }

}

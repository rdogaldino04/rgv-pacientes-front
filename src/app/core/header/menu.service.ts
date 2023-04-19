import { Injectable } from '@angular/core';
import { Menu } from '../../shared/components/rgv-navbar/menu';

@Injectable({ providedIn: 'root' })
export class MenuService {

    constructor() { }

    getAll(): Menu[] {
        return [
            { id: 1, name: 'Home', active: true, url: '', subMenus: [], parentId: null },
            {
                id: 2, name: 'Cadastros', active: false, url: '', subMenus: [
                    { id: 4, name: 'Pacientes', active: false, url: 'pacientes', subMenus: [], parentId: 2 },
                    { id: 5, name: 'Plano de saúde', active: false, url: '', subMenus: [], parentId: 2 }
                ]
                , parentId: null
            },
            { id: 3, name: 'Atendimentos', active: false, url: '', subMenus: [], parentId: null },
        ];
    }

}

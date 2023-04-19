import { Injectable } from '@angular/core';
import { ItemMenu } from '../../shared/components/rgv-navbar/item-menu';

@Injectable({ providedIn: 'root' })
export class ItemMenuService {

    constructor() { }

    getAll(): ItemMenu[] {
        return [
            { id: 1, name: 'Home', active: true, url: '', itemMenus: [], parentId: null },
            {
                id: 2, name: 'Cadastros', active: false, url: '', itemMenus: [
                    { id: 4, name: 'Pacientes', active: false, url: 'pacientes', itemMenus: [], parentId: 2 },
                    { id: 5, name: 'Plano de saúde', active: false, url: '', itemMenus: [], parentId: 2 }
                ]
                , parentId: null
            },
            { id: 3, name: 'Atendimentos', active: false, url: '', itemMenus: [], parentId: null },
        ];
    }

}

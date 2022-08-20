import { Component } from '@angular/core';
import { ItemMenu } from './item-menu';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    public itemsMenus: ItemMenu[] = [
        { id: 1, name: 'Home', active: true, url: '' },
        { id: 2, name: 'Pacientes', active: false, url: 'pacientes' },
    ];

    navegateTo(item: ItemMenu) {
      this.itemsMenus.forEach(i => {
        i.active = i.id == item.id;
      })

    }

}

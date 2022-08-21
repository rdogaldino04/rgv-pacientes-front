import { Component } from '@angular/core';
import { ItemMenu } from './item-menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  isCollapse = false;
  public itemsMenus: ItemMenu[] = [
    { id: 1, name: 'Home', active: true, url: '' },
    { id: 2, name: 'Pacientes', active: false, url: 'pacientes' },
  ];

  navegateTo(item: ItemMenu): void {
    this.itemsMenus.forEach(i => {
      i.active = i.id === item.id;
    });
  }

  toCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }
}

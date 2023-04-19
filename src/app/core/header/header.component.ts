import { Component, OnInit } from '@angular/core';
import { Menu } from '../../shared/components/rgv-navbar/menu';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menus = this.menuService.getAll();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../menu';
import { MenuService } from '../../service/menu.service';
import { Router } from '@angular/router';
import { MatLegacyMenuTrigger as MatMenuTrigger } from '@angular/material/legacy-menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @ViewChild(MatMenuTrigger) aboveMenu!: MatMenuTrigger;

  public menus: Menu[] = [];

  constructor(private menuService: MenuService, private router: Router) {
  }

  ngOnInit(): void {
    this.menuService.getAll()
      .subscribe(menus => this.menus = menus);
  }

  navegateTo(menu: Menu): void {
    if (!menu.menuParent) {
      const HOME = 1;
      if (menu.id === HOME) {
        this.aboveMenu.closeMenu();
        this.router.navigate(['']);
      }
      return;
    }
    this.router.navigate([menu.url ? menu.url : '']);
  }

}

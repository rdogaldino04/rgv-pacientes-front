import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { MenuService } from '../../service/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(private menuService: MenuService, private router: Router) {
  }

  ngOnInit(): void {
    this.menuService.getAll()
      .subscribe(menus => this.menus = menus);
  }

  navegateTo(url: string): void {
    this.router.navigate([url]);
  }

}

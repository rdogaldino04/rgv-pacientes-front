import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../menu';
import { MenuService } from '../../service/menu.service';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserService } from 'src/app/service/user.service';
import { HeaderService } from './header.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) aboveMenu!: MatMenuTrigger;

  public menus: Menu[] = [];
  public showMenu = false;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private userService: UserService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.menuService.getAll().subscribe((menus) => {
      this.showMenu = this.userService.isLogged();
      this.menus = menus;
    });

    this.headerService.showMenuSubject$
      .pipe(
        tap((showMenu) => (this.showMenu = showMenu)),
        switchMap(() => this.menuService.getAll())
      )
      .subscribe((menus) => (this.menus = menus));
  }

  navegateTo(menu: Menu): void {
    if (!menu.menuParent) {
      const HOME = 1;
      this.aboveMenu.closeMenu();
      if (menu.id === HOME) {
        this.router.navigate(['']);
      }
      if (menu.id === 0) {
        this.router.navigate(['login']);
      }
      return;
    }
    this.router.navigate([menu.url ? menu.url : '']);
  }

  hasSubMenus(subMenus: Menu[]): boolean {
    return subMenus.length > 0;
  }

  logout(): void {
    this.headerService.showMenuSubject$.next(false);
    this.userService.logout();
    this.router.navigate(['login']);
  }
}

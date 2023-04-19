import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/shared/components/rgv-navbar/menu';

@Component({
    selector: 'rgv-navbar',
    templateUrl: './rgv-navbar.component.html',
})
export class RgvNavbarComponent implements OnInit {

    @Input() brand = '';
    @Input() logo = '';
    @Input() menus: Menu[] = [];
    isCollapse = false;
    showSubMenus = false;
    opened = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.menus.forEach(item => {
            if (item.subMenus.length > 0) {
                console.log('tem filhos')
            } else {
                console.log('no filhos')
            }
        })
    }

    navegateTo(item: Menu): void {
        this.menus.forEach(i => {
            i.active = i.id === item.id;
        });

        if (item.subMenus.length === 0) {
            this.router.navigate([item.url ? item.url : '']);
            this.showSubMenus = false;
            return;
        }

        this.showSubMenus = !this.showSubMenus;
    }

    navegateChildTo(item: Menu): void {        
        if (item.subMenus.length === 0) {
            this.router.navigate([item.url ? item.url : '']);
            this.showSubMenus = false;
            return;
        }

        this.showSubMenus = !this.showSubMenus;
    }

    toCollapse(): void {
        this.isCollapse = !this.isCollapse;
    }
}

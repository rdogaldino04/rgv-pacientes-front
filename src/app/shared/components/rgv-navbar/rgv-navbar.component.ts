import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemMenu } from 'src/app/shared/components/rgv-navbar/item-menu';

@Component({
    selector: 'rgv-navbar',
    templateUrl: './rgv-navbar.component.html',
})
export class RgvNavbarComponent implements OnInit {

    @Input() brand = '';
    @Input() logo = '';
    @Input() itemMenus: ItemMenu[] = [];
    isCollapse = false;
    showSubMenus = false;
    opened = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.itemMenus.forEach(item => {
            if (item.itemMenus.length > 0) {
                console.log('tem filhos')
            } else {
                console.log('no filhos')
            }
        })
    }

    navegateTo(item: ItemMenu): void {
        this.itemMenus.forEach(i => {
            i.active = i.id === item.id;
        });

        if (item.itemMenus.length === 0) {
            this.router.navigate([item.url]);
            this.showSubMenus = false;
            return;
        }

        this.showSubMenus = !this.showSubMenus;
    }

    navegateChildTo(item: ItemMenu): void {        
        if (item.itemMenus.length === 0) {
            this.router.navigate([item.url]);
            this.showSubMenus = false;
            return;
        }

        this.showSubMenus = !this.showSubMenus;
    }

    toCollapse(): void {
        this.isCollapse = !this.isCollapse;
    }
}

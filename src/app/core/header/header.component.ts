import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '../../shared/components/rgv-navbar/item-menu';
import { ItemMenuService } from './item-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public itemMenus: ItemMenu[] = [];

  constructor(private itemMenuService: ItemMenuService) {
  }

  ngOnInit(): void {
    this.itemMenus = this.itemMenuService.getAll();
  }

}

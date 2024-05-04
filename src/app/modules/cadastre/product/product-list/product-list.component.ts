import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductPage } from 'src/app/model/product-page';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  readonly displayedColumns = [
    'id',
    'name',
    'expirationDate',
    'createdAt',
    'ações',
  ];
  @Input() productPage: ProductPage = new ProductPage();

  @Output() eventCreate$ = new EventEmitter();
  @Output() eventUpdate$ = new EventEmitter();
  @Output() eventDelete$ = new EventEmitter();
  @Output() pageInfo = new EventEmitter(false);

  length = 0;
  pageSize = 0;
  pageSizeOptions = [5, 10, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  onPageInfo(pageEvent: PageEvent): void {
    this.pageInfo.emit(pageEvent);
  }
}

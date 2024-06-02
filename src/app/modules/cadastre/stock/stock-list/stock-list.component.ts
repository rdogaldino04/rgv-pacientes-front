import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { StockPage } from 'src/app/model/stock-page';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent {
  readonly displayedColumns = ['id', 'name', 'sector', 'ações'];

  @Input() stockPage: StockPage = new StockPage();

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

  onPageInfo($event: PageEvent): void {
    this.pageInfo.emit($event);
  }
}

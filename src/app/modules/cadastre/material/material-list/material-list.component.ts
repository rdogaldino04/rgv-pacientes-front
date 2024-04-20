import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MaterialPage } from 'src/app/model/material-page';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent {
  readonly displayedColumns = [
    'id',
    'name',
    'expirationDate',
    'registrationDate',
    'ações',
  ];
  @Input() materialPage: MaterialPage = new MaterialPage();

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

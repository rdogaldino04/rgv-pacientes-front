import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SectorPage } from 'src/app/model/sector-page';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss'],
})
export class SectorListComponent implements OnInit {
  readonly displayedColumns = ['id', 'name', 'actions'];

  @Input() sectorPage: SectorPage;

  @Output() pageInfo = new EventEmitter(false);

  constructor() {}

  ngOnInit(): void {}

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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CompanyPage } from 'src/app/model/company-page';
import { formatCnpj } from 'src/app/shared/utils/cnpj-utils';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  readonly displayedColumns = ['id', 'name', 'cnpj', 'ações'];
  @Input() companyPage: CompanyPage | null = null;

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

  ngOnInit(): void {}

  onPageInfo(pageEvent: PageEvent): void {
    this.pageInfo.emit(pageEvent);
  }

  getMaskedCnpj(cnpj: string): string {
    return formatCnpj(Number(cnpj));
  }
}

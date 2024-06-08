import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SectorPage } from 'src/app/model/sector-page';
import { SectorService } from 'src/app/service/sector.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
})
export class SectorComponent implements OnInit {
  sectorPage: SectorPage | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.sectorPage = data.sectorPage;
    });
  }

  onPageInfo(pageEvent: PageEvent): void {
    // this.batchFilterform.get('size').setValue(pageEvent.pageSize);
    // this.batchFilterform.get('page').setValue(pageEvent.pageIndex);
    this.sectorService
      .getAll({ size: pageEvent.pageSize, page: pageEvent.pageIndex })
      .subscribe((sectorPage) => {
        this.sectorPage = sectorPage;
      });
  }
}

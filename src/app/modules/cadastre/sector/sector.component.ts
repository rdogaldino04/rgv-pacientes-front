import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { SectorPage } from 'src/app/model/sector-page';
import { SectorService } from 'src/app/service/sector.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
})
export class SectorComponent implements OnInit {
  sectorPage: SectorPage | null = null;
  sectorFilterform: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.sectorPage = data.sectorPage;
    });
    this.sectorFilterform = this.formBuilder.group({
      id: [null],
      name: [null],
      size: [null],
      page: [null],
      company: [null],
    });
  }

  onPageInfo(pageEvent: PageEvent): void {
    this.sectorFilterform.get('size').setValue(pageEvent.pageSize);
    this.sectorFilterform.get('page').setValue(pageEvent.pageIndex);
    this.sectorService
      .getAll({ size: pageEvent.pageSize, page: pageEvent.pageIndex })
      .subscribe((sectorPage) => {
        this.sectorPage = sectorPage;
      });
  }

  onFilter(): void {
    this.sectorService
      .getAll(this.sectorFilterform.getRawValue())
      .subscribe((sectorPage) => {
        this.sectorPage = sectorPage;
      });
  }
}

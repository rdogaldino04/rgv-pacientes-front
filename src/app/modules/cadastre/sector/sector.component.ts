import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SectorPage } from 'src/app/model/sector-page';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
})
export class SectorComponent implements OnInit {
  sectorPage$: Observable<SectorPage> | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.sectorPage$ = data.sectorPage;
    });
  }
}

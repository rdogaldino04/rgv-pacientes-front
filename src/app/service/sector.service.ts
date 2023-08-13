import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Sector } from '../model/sector';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class SectorService {

    private sectors: Sector[] = [
        { id: 1, name: 'SETOR 1' },
        { id: 2, name: 'SETOR 2' },
        { id: 3, name: 'SETOR 3' },
        { id: 4, name: 'SETOR 4' },
    ];

    constructor(private http: HttpClient) { }

    findById(id: number): Observable<Sector> {
        return of(this.sectors.filter(sector => sector.id === id)[0]);
    }

    findByName(name: string): Observable<Sector[]> {
        const searchTerm = name.toLowerCase();
        const filteredSectors = this.sectors.filter(sector =>
            sector.name.toLowerCase().includes(searchTerm)
        );
        return of(filteredSectors).pipe(delay(500));
    }

}

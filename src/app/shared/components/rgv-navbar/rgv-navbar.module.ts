import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RgvNavbarComponent } from './rgv-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [RgvNavbarComponent],
    exports: [RgvNavbarComponent],
    imports: [CommonModule, RouterModule]
})
export class RgvNavbarModule { }

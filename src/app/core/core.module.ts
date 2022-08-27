import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AlertModule } from '../shared/components/alert/alert.module';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule
    ],

})
export class CoreModule { }

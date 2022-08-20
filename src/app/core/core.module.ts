import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from '../shared/components/menu/menu.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        RouterModule,
        MenuModule,
    ],
    
})
export class CoreModule { }
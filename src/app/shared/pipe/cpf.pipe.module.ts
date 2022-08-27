import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CpfPipe } from './cpf.pipe';


@NgModule({
    declarations: [CpfPipe],
    exports: [CpfPipe],
    imports: [
        CommonModule,
        RouterModule
    ],

})
export class CpfPipeModule { }

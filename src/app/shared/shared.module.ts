import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CpfMaskDirective } from './directives/cpf-mask.directive';
import { PhoneMaskDirective } from './directives/phone-mask.directive';

@NgModule({
    declarations: [
        ConfirmationDialogComponent,
        ErrorDialogComponent,
        CpfMaskDirective,
        PhoneMaskDirective
    ],
    imports: [
        CommonModule,
        AppMaterialModule
    ],
    exports: [
        ConfirmationDialogComponent,
        ErrorDialogComponent,
        CpfMaskDirective,
        PhoneMaskDirective
    ]
})
export class SharedModule { }

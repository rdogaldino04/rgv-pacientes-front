import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
    declarations: [
        ConfirmationDialogComponent,
        ErrorDialogComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule
    ],
    exports: [
        ConfirmationDialogComponent,
        ErrorDialogComponent
    ]
})
export class SharedModule { }

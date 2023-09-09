import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  exports: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class AutocompleteModule { }

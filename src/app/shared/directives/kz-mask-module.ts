import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KzMaskDirective } from './kz-mask-directive';

@NgModule({
  declarations: [KzMaskDirective],
  exports: [KzMaskDirective],
  imports: [CommonModule]
})
export class KzMaskModule {

}

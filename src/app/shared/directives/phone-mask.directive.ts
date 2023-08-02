import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');

    if (value.length <= 10) {
      // Formato para números fixos: (XX) XXXX-XXXX
      input.value = this.formatFixedNumber(value);
    } else {
      // Formato para números de celular: (XX) XXXXX-XXXX
      input.value = this.formatMobileNumber(value);
    }
  }

  private formatFixedNumber(value: string): string {
    return value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  private formatMobileNumber(value: string): string {
    return value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}

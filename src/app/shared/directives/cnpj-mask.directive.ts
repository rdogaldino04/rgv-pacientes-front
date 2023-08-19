import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCnpjMask]'
})
export class CnpjMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 14) {
      event.target.value = this.applyCnpjMask(value);
    } else {
      event.target.value = value.substring(0, 14);
    }
  }

  applyCnpjMask(value: string): string {
    return value
      .replace(/(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2}).*/, (_, p1, p2, p3, p4, p5) =>
        [p1, p2, p3].filter(Boolean).join('.') + (p4 ? `/${p4}` : '') + (p5 ? `-${p5}` : '')
      )
      .replace(/(\d{2})(\d{3})(\d{0,3})(\d{0,4})(\d{0,2}).*/, (_, p1, p2, p3, p4, p5) =>
        [p1, p2, p3].filter(Boolean).join('.') + (p4 ? `/${p4}` : '') + (p5 ? `-${p5}` : '')
      )
      .replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})(\d{0,2}).*/, (_, p1, p2, p3, p4, p5) =>
        [p1, p2, p3].filter(Boolean).join('/') + (p4 ? `-${p4}` : '') + (p5 ? `-${p5}` : '')
      )
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/, (_, p1, p2, p3, p4, p5) =>
        [p1, p2, p3].filter(Boolean).join('-') + (p4 ? `-${p4}` : '') + (p5 ? `${p5}` : '')
      );
  }
}

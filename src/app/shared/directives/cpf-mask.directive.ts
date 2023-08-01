import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appCpfMask]'
})
export class CpfMaskDirective {
    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInputChange(event: any) {
        const value = event.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            event.target.value = this.applyCpfMask(value);
        } else {
            event.target.value = value.substring(0, 11);
        }
    }

    applyCpfMask(value: string): string {
        return value
            .replace(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,2}).*/, (_, p1, p2, p3, p4) =>
                [p1, p2, p3].filter(Boolean).join('.') + (p4 ? `-${p4}` : '')
            );
    }
}

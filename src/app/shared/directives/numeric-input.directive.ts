import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appNumericInput]'
})
export class NumericInputDirective {
    constructor(private el: ElementRef, private control: NgControl, private renderer: Renderer2) { }

    @HostListener('input', ['$event'])
    onInputChange(event: any) {
        const sanitizedValue = event.target.value.replace(/\D/g, '');
        this.control.control.setValue(sanitizedValue, { emitEvent: false });
        this.renderer.setProperty(this.el.nativeElement, 'value', sanitizedValue);
    }
}

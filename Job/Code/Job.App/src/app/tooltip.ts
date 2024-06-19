import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    standalone:true,
    selector: '[hintText]',
})
export class ToolTipDirective {
    constructor(private el: ElementRef) {}

    @Input()
    set hintText(value: string[]) {
        this.el.nativeElement.title = value;
    }
}
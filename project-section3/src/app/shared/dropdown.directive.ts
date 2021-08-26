import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core'

@Directive({
    selector: '[appDropdown]'
})
export class AppDropdownDirective {
    isOpen = false;

    @Input()
    appDropdown: ElementRef;

    @HostListener('document:click', ['$event'])
    toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;

        if(this.isOpen) {
            this.renderer.addClass(this.appDropdown, 'show');
        }
        else {
            this.renderer.removeClass(this.appDropdown, 'show');
        }
    }

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }
}
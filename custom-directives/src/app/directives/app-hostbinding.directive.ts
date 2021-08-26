import { Directive, OnInit, ElementRef, HostListener, HostBinding } from '@angular/core'

@Directive({
    selector: '[app-hostbinding]'
})
export class AppHostbinding implements OnInit {
    @HostBinding('style.backgroundColor')
    backgroundColor: string = 'transparent';

    constructor(private element: ElementRef) { }

    ngOnInit(): void {
        
    }

    @HostListener('mouseenter') mouseenter(data: Event){
        this.backgroundColor = 'red'
    }

    @HostListener('mouseleave') mouseleave(data: Event){
        this.backgroundColor = 'transparent'
    }     
}
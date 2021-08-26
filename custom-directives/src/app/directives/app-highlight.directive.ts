import { Directive, OnInit, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
    selector: '[app-highlight]'
})
export class AppHighlight implements OnInit {
    @Input('app-highlight')
    color: string = 'green';

    @Input()
    mouseColor: string = 'gray'; 

    constructor(private element: ElementRef) { }

    ngOnInit(): void {
        
        this.element.nativeElement.style.backgroundColor = this.color
    }

    @HostListener('mouseenter') mouseenter(data: Event){
        this.element.nativeElement.style.backgroundColor =  this.mouseColor
    }

    @HostListener('mouseleave') mouseleave(data: Event){
        this.element.nativeElement.style.backgroundColor =  this.color
    }     
}
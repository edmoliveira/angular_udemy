import { Directive, OnInit, ElementRef, Renderer2, RendererStyleFlags2, HostListener, Input } from '@angular/core'

@Directive({
    selector: '[app-better-highlight]'
})
export class AppBetterHighlight implements OnInit {
    @Input('app-better-highlight')
    color: string = 'blue';

    @Input()
    mouseColor: string = 'gray';    

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.renderer.setStyle(this.element.nativeElement, 'background-color', this.color, RendererStyleFlags2.Important);
    }

    @HostListener('mouseenter') mouseenter(data: Event){
        this.renderer.setStyle(this.element.nativeElement, 'background-color', this.mouseColor, RendererStyleFlags2.Important);
    }

    @HostListener('mouseleave') mouseleave(data: Event){
        this.renderer.setStyle(this.element.nativeElement, 'background-color', this.color, RendererStyleFlags2.Important);
    }    
}
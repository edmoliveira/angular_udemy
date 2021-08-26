import { Component, OnInit, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output('onMenuSelect') 
  menuSelect: EventEmitter<string> = new EventEmitter();

  @ViewChild('recipe', {static: true})
  recipe: ElementRef;

  @ViewChild('shopping', {static: true})
  shopping: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(element: HTMLElement) {
    this.cleanMenuSelect();

    element.classList.add('active');
    this.menuSelect.emit(element.innerHTML);
  }

  cleanMenuSelect(){
    this.recipe.nativeElement.classList.remove('active');
    this.shopping.nativeElement.classList.remove('active');
  }
}
import { Component, OnInit, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.css']
})
export class HeaderContentComponent implements OnInit, AfterContentInit {
  @ContentChild('heardcontent', {static: true})
  heardcontent: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.heardcontent.nativeElement.innerHTML = 'Boards';
  }
}

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MessageServer } from './models/messageServer';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Native or ShadowDom
})
export class GridComponent implements OnInit {
  @Input('messages')
  elements: MessageServer[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

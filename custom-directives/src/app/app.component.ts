import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  headerCondition = false;
  headerValue = 0;

  items: string[] = [
    'Node','Node','Node','Node','Node'
  ]

  constructor(){
    const self  = this;

    setInterval(function(){
      self.headerValue = (self.headerValue + 1) % 4
    }, 1000);
  }

  onHeader(){
    this.headerCondition = this.headerCondition ? false : true;
  }
}

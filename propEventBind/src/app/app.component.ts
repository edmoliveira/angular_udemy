import { Component } from '@angular/core';
import { MessageServer } from './grid/models/messageServer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  messages: MessageServer[] = [];

  addNewMessage(data: MessageServer){
    if(this.messages.length > 10){
      this.messages.pop();
    }

    this.messages.unshift(data);
  }
}

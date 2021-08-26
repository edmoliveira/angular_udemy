import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { io } from 'socket.io-client';
import { MessageServer } from '../grid/models/messageServer';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  socket: any;
  @Output('onNewMessage')
  newMessage: EventEmitter<MessageServer> = new EventEmitter();

  @ViewChild('lastmessage', {static: true})
  lastmessage: ElementRef;

  constructor(public datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  start(elementH3: HTMLElement) {
    this.socket = io('http://127.0.0.1:3000');

    this.socket.on('data', (data: string) => {
      const obj = JSON.parse(data);
      
      obj.datetime = new Date(obj.datetime);

      this.lastmessage.nativeElement.innerHTML =this.datepipe.transform(obj.datetime, 'medium');

      this.newMessage.emit(obj);
    });   
    
    elementH3.innerHTML = "On"
    elementH3.style.color = 'green';
  }

  stop(elementH3: HTMLElement) {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    elementH3.innerHTML = "Off"
    elementH3.style.color = 'red';
  }
}

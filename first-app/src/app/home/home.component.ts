import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  serverName: string = '';
  users = [];

  constructor() { }

  ngOnInit(): void {
  }

  update(){
    this.serverName += " NIF: 297603094"
  }

  add() {
    this.users.push(this.serverName);
    this.serverName = '';
  }

  getColor(){
    if(this.serverName.indexOf('NIF') > -1) {
      return 'green';
    }
    else {
      return 'orange';
    }
  }
}

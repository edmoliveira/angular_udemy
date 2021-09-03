import { Component, OnInit } from '@angular/core';
import { AuthenticantionService } from './authenticaton.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn = false;

  constructor(private authenticantionService: AuthenticantionService) {

  }

  ngOnInit() {
    this.loggedIn = this.authenticantionService.checkAuthenticated();

    this.authenticantionService.onState.subscribe(state => {
      this.loggedIn = state;
    })
  }
}

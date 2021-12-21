import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { faderAnimation } from './app-routing-animation';
import { AuthenticantionService } from './shared/authenticaton.service';
import { UsersOnline } from './shared/models/users-online';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ faderAnimation ]
})
export class AppComponent implements OnInit {
  usersOnlineObs: Observable<UsersOnline[]>;
  isAuthenticated: Observable<boolean>;

  constructor(private authenticantionService: AuthenticantionService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authenticantionService.authenticatonStation;
    this.usersOnlineObs = this.authenticantionService.usersOnlineObs;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

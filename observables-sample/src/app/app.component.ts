import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  activated: boolean;
  subscription: Subscription;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
     this.subscription = this.userService.onActivated.subscribe( (nextValue:boolean) => {
      this.activated = nextValue;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

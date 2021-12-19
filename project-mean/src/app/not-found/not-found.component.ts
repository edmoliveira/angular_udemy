import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  message: string;
  subscription: Subscription;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.router.data.subscribe(data => {
      this.message = data["message"];
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

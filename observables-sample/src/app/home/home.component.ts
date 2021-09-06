import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription1 = interval(1000).subscribe((next: number) => {
      console.log(next);
    });

    const customIntervalObservable = Observable.create(observer => {
      let count = 1;
      setInterval(() =>{
        observer.next(count);

        if(count === 7){
         // observer.completed();
        }

        if(count > 5) {
          observer.error(new Error('Count is greater than 9'));
        }

        count += 2;
      }, 1000)
    });

    this.subscription2 = customIntervalObservable
      .pipe( 
        filter((data: number) => {
          return data > 1;
        })
        ,map((data: number) => {
        return 'Round:' + data;
        })
      )
      .subscribe((next: number) => {
        console.log(next);
      }, error => {
        this.subscription1.unsubscribe();
        console.error(error);
      }, () => {
        console.log('Completed')
      });
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}

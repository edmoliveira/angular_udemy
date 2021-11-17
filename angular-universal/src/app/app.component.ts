import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-universal';

  constructor(@Inject(PLATFORM_ID) private platformId:any) {

  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      console.log("I am running on the Browser")
    }
  }
}

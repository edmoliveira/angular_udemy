import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuValue: string = 'Recipes'

  menuSelected(code: string){
    this.menuValue = code;
  }
}

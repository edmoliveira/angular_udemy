import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ControlComponent } from './control/control.component';
import { GridComponent } from './grid/grid.component';

import { DatePipe } from '@angular/common';
import { HeaderContentComponent } from './header-content/header-content.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    GridComponent,
    HeaderContentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppHighlight } from './directives/app-highlight.directive';
import { AppBetterHighlight } from './directives/app-better-highligh.directive';
import { AppHostbinding } from './directives/app-hostbinding.directive';
import { AppUnless } from './directives/app-unless-directive';

@NgModule({
  declarations: [
    AppComponent,
    AppHighlight,
    AppBetterHighlight,
    AppHostbinding,
    AppUnless
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

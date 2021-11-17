import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "./home.component";
import { WelcomeComponent } from "./welcome/welcome.component";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        WelcomeComponent
    ]
    , imports: [
        RouterModule,
        BrowserModule
      ] 
})
export class HomeModule {

}
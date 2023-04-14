import {APP_INITIALIZER, NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from "./components/home/home.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import Environment from "../../environments/environment.interface";
import {environment} from "../../environments/environment";
import Auth from "./models/auth.model";
import {AuthService} from "./services/auth.service";

const init = (authService: AuthService) => {
  return () => authService.init();
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: Environment, useValue: environment},
    {provide: Auth, useValue: new Auth()},
    {provide: APP_INITIALIZER, useFactory: init, deps: [AuthService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

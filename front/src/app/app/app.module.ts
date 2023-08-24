import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import Environment from "../../environments/environment.interface";
import {environment} from "../../environments/environment";
import Auth from "./models/auth.model";
import {AuthService} from "./services/auth.service";
import {SharedModule} from "../shared/shared.module";
import {NavComponent} from './components/nav/nav.component';
import {NotificationComponent} from './components/notification/notification.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DataService} from "./services/data.service";

const init = (authService: AuthService, dataService: DataService) => {
  authService.init();
  dataService.init();
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotificationComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: Environment, useValue: environment},
    {provide: Auth, useValue: new Auth()},
    {provide: APP_INITIALIZER, useFactory: init, deps: [AuthService, DataService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

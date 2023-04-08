import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "../core/core.module";
import Environment from "src/environments/environment.interface";
import {environment} from "src/environments/environment";
import {BehaviorSubject, Subject} from "rxjs";
import Auth from "../core/models/auth.model";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {provide: Environment, useValue: environment},
    {provide: BehaviorSubject<Auth>, useValue: new BehaviorSubject<Auth | undefined>(undefined)}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {InputComponent} from "./components/input/input.component";
import { CallbackComponent } from './components/callback/callback.component';

@NgModule({
  declarations: [
    InputComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }

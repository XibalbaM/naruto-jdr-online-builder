import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomeComponent} from './components/home/home.component';
import {SharedModule} from "../shared/shared.module";
import {HomeButtonComponent} from './components/home-button/home-button.component';


@NgModule({
  declarations: [
      HomeComponent,
      HomeButtonComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }

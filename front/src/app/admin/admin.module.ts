import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {SharedModule} from "../shared/shared.module";
import {HomeButtonComponent} from './components/home-button/home-button.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HomeComponent,
        HomeButtonComponent
    ]
})
export class AdminModule {
}

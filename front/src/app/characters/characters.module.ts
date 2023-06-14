import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { ListComponent } from './components/list/list.component';
import { FirstStepComponent } from './components/create/first-step/first-step.component';
import { InitStepComponent } from './components/create/init-step/init-step.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ListComponent,
    FirstStepComponent,
    InitStepComponent
  ],
    imports: [
        CommonModule,
        CharactersRoutingModule,
        SharedModule
    ]
})
export class CharactersModule { }

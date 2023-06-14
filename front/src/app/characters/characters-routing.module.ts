import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {FirstStepComponent} from "./components/create/first-step/first-step.component";
import {InitStepComponent} from "./components/create/init-step/init-step.component";

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'creation', redirectTo: 'creation/0', pathMatch: 'full' },
  { path: 'creation/0', component: InitStepComponent },
  { path: 'creation/1', component: FirstStepComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }

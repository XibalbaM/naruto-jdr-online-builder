import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InputComponent} from "./components/input/input.component";
import {CallbackComponent} from "./components/callback/callback.component";

const routes: Routes = [
  { path: '', component: InputComponent },
  { path: 'reponse', component: CallbackComponent },
  { path: ':token', component: CallbackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

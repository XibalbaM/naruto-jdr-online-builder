import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InputComponent} from "./components/input/input.component";
import {CallbackComponent} from "./components/callback/callback.component";

const routes: Routes = [
  { path: '', component: InputComponent, title: "Connexion — Naruto jdr" },
  { path: 'reponse', component: CallbackComponent, title: "Connexion — Naruto jdr" },
  { path: ':token', component: CallbackComponent, title: "Connexion — Naruto jdr" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

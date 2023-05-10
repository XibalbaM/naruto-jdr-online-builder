import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AuthenticatedGuard} from "./guards/authenticated.guard";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticatedGuard]},
  { path: 'connexion', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
  { path: 'compte', loadChildren: () => import('../account/account.module').then(m => m.AccountModule), canActivate: [AuthenticatedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

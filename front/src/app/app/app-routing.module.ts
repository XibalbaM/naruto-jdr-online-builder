import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AuthenticatedGuard} from "./guards/authenticated.guard";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticatedGuard], data: {bgMethode: "image"}, title: "Naruto jdr"},
  { path: 'connexion', loadChildren: () => import('../login/login.module').then(m => m.LoginModule), data: {navbar: "none", bgMethode: "image"}, title: "Connexion — Naruto jdr"},
  { path: 'compte', loadChildren: () => import('../account/account.module').then(m => m.AccountModule), canActivate: [AuthenticatedGuard] },
  { path: 'personnages', loadChildren: () => import('../characters/characters.module').then(m => m.CharactersModule), canActivate: [AuthenticatedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

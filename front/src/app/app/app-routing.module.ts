import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticatedGuard} from "./guards/authenticated.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'personnages' },
  { path: 'connexion', loadChildren: () => import('../login/login.module').then(m => m.LoginModule), data: {navbar: "none", bgMethode: "image"}},
  { path: 'compte', loadChildren: () => import('../account/account.module').then(m => m.AccountModule), canActivate: [AuthenticatedGuard] },
  { path: 'personnages', loadChildren: () => import('../characters/characters.module').then(m => m.CharactersModule), canActivate: [AuthenticatedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NormalNavbarComponent} from "../app/components/normal-navbar/normal-navbar.component";
import {UsersComponent} from "./components/users/users.component";
import {UserComponent} from "./components/user/user.component";
import {BackNavbarComponent} from "../app/components/back-navbar/back-navbar.component";

export const adminRoutes: Routes = [
    {path: '', component: HomeComponent, title: 'Page administrateur — Naruto jdr', data: {navbar: NormalNavbarComponent}},
    {path: 'comptes', component: UsersComponent, title: 'Gestion des utilisateurs — Naruto jdr', data: {navbar: BackNavbarComponent, navbarText: "Espace admin"}},
    {path: 'comptes/:id', component: UserComponent, title: 'Gestion des utilisateurs — Naruto jdr', data: {navbar: BackNavbarComponent, navbarText: "Comptes"}}
];
import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NormalNavbarComponent} from "../app/components/normal-navbar/normal-navbar.component";

export const adminRoutes: Routes = [
    {path: '', component: HomeComponent, title: 'Page administrateur — Naruto jdr', data: {navbar: NormalNavbarComponent}}
];
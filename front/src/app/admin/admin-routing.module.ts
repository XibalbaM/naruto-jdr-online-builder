import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NormalNavbarComponent} from "../app/components/normal-navbar/normal-navbar.component";

const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Page administrateur — Naruto jdr', data: {navbar: NormalNavbarComponent}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}

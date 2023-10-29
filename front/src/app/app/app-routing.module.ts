import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticatedGuard} from "./guards/authenticated.guard";
import {AdminGuard} from "./guards/admin.guard";
import {UserResolver} from "./resolvers/user.resolver";
import {BackNavbarComponent} from "./components/back-navbar/back-navbar.component";
import {MarkdownHelpComponent} from "./components/markdown-help/markdown-help.component";
import {routes as characterRoutes} from "../characters/characters-routing.module";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'personnages'},
    {path: 'connexion', loadChildren: () => import('../login/login.module').then(m => m.LoginModule), data: {navbar: "none", bgClass: "image-bg"}},
    {path: 'compte', loadChildren: () => import('../account/account.module').then(m => m.AccountModule), canActivate: [AuthenticatedGuard]},
    {path: 'personnages', children: characterRoutes, canActivate: [AuthenticatedGuard]},
    {path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule), resolve: [UserResolver], canActivate: [AdminGuard]},
    {
        path: 'mise-en-forme',
        component: MarkdownHelpComponent,
        data: {navbar: BackNavbarComponent, bgClass: "no-repeat-image-bg", navbarText: "service", navbarBackUrl: "service"},
        title: "Aide de mise en forme"
    },
    {path: '**', redirectTo: 'personnages'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

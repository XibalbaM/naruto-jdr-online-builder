import {Routes} from '@angular/router';
import {AuthenticatedGuard} from "./guards/authenticated.guard";
import {AdminGuard} from "./guards/admin.guard";
import {UserResolver} from "./resolvers/user.resolver";
import {BackNavbarComponent} from "./components/back-navbar/back-navbar.component";
import {MarkdownHelpComponent} from "./components/markdown-help/markdown-help.component";
import {characterRoutes} from "../characters/characters.routes";
import {accountRoutes} from "../account/account.routes";
import {adminRoutes} from "../admin/admin.routes";
import {loginRoutes} from "../login/login.routes";

export const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'personnages'},
    {path: 'connexion', children: loginRoutes, data: {navbar: "none", bgClass: "image-bg"}},
    {path: 'compte', children: accountRoutes, canActivate: [AuthenticatedGuard]},
    {path: 'personnages', children: characterRoutes, canActivate: [AuthenticatedGuard]},
    {path: 'admin', children: adminRoutes, resolve: [UserResolver], canActivate: [AdminGuard]},
    {path: 'mise-en-forme', component: MarkdownHelpComponent, data: {navbar: BackNavbarComponent, bgClass: "no-repeat-image-bg", navbarText: "service", navbarBackUrl: "service"}, title: "Aide de mise en forme"},
    {path: '**', redirectTo: 'personnages'},
];
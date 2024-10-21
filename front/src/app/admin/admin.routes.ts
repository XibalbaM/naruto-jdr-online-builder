import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NormalNavbarComponent} from "../app/components/normal-navbar/normal-navbar.component";
import {UsersComponent} from "./components/users/users.component";
import {UserComponent} from "./components/user/user.component";
import {BackNavbarComponent} from "../app/components/back-navbar/back-navbar.component";
import {BasesComponent} from "./components/bases/bases.component";
import {BaseComponent} from "./components/base/base.component";
import {SkillsComponent} from "./components/skills/skills.component";
import {SkillComponent} from "./components/skill/skill.component";
import {SkillEditComponent} from "./components/skill-edit/skill-edit.component";

export const adminRoutes: Routes = [
    {path: '', component: HomeComponent, title: 'Page administrateur — Ninjadex', data: {navbar: NormalNavbarComponent}},
    {path: 'comptes', component: UsersComponent, title: 'Gestion des utilisateurs — Ninjadex', data: {navbar: BackNavbarComponent, navbarText: "Espace admin"}},
    {path: 'comptes/:id', component: UserComponent, title: 'Gestion des utilisateurs — Ninjadex', data: {navbar: BackNavbarComponent, navbarText: "Comptes", bgClass: "no-repeat-image-bg"}},
    {path: 'bases', component: BasesComponent, title: 'Textes des bases — Ninjadex', data: {navbar: BackNavbarComponent, navbarText: "Espace admin"}},
    {path: 'bases/:id', component: BaseComponent, title: 'Textes des bases — Ninjadex', data: {navbar: BackNavbarComponent, navbarText: "Bases"}},
    {path: 'competences', component: SkillsComponent, title: 'Textes des compétences — Ninjadex', data: {navbar: BackNavbarComponent, navbarText: "Espace admin"}},
    {path: 'competences/:id', component: SkillComponent, title: 'Textes des compétences — Ninjadex', data: {navbar: BackNavbarComponent, navbarText: "Compétences"}},
    {path: 'competences/:id/modification', component: SkillEditComponent, title: 'Textes des compétences — Ninjadex', data: {navbar: BackNavbarComponent}},
];
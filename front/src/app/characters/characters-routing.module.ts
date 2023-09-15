import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {FirstStepComponent} from "./components/create/first-step/first-step.component";
import {SecondStepComponent} from "./components/create/second-step/second-step.component";
import {ThirdStepComponent} from "./components/create/third-step/third-step.component";
import {BaseComponent} from "./components/base/base.component";
import {SkillComponent} from "./components/skill/skill.component";
import {EditComponent} from "./components/edit/edit.component";
import {LineComponent} from "./components/line/line.component";
import {UserResolver} from "../app/resolvers/user.resolver";
import {EditDetailsComponent} from "./components/edit-details/edit-details.component";
import {PredrawnComponent} from "./components/predrawn/predrawn.component";

const routes: Routes = [
    {path: '', component: ListComponent, resolve: {user: UserResolver}, data: {bgMethode: "none"}, title: "Liste de personnages — Naruto jdr"},
    {
        path: 'creation', data: {bgMethode: "none"}, children: [
            {path: '', redirectTo: '1', pathMatch: 'full'},
            {path: '1', component: FirstStepComponent, title: "Création de personnage — Étape 1 — Naruto jdr"},
            {path: '2', component: SecondStepComponent, title: "Création de personnage — Étape 2 — Naruto jdr"},
            {path: '3', component: ThirdStepComponent, title: "Création de personnage — Étape 3 — Naruto jdr"}
        ]
    },
    {path: 'pretires', component: PredrawnComponent, resolve: {user: UserResolver}, data: {bgMethode: "none"}, title: "Personnages prétirés — Naruto jdr"},
    {
        path: ':characterId/base/:id', component: BaseComponent, data: {navbar: "character", bgMethode: "imageNoRepeat"}, resolve: {user: UserResolver},
        title: "Base — Fiche de personnage — Naruto jdr"
    },
    {
        path: ':characterId/competence/:id', component: SkillComponent, data: {navbar: "character", bgMethode: "imageNoRepeat"}, resolve: {user: UserResolver},
        title: "Compétence — Fiche de personnage — Naruto jdr"
    },
    {
        path: ':characterId/lignee', component: LineComponent, data: {navbar: "characterWithNav", bgMethode: 'image'},
        title: "Fiche de personnage — Naruto jdr"
    },
    {
        path: ':characterId/details', component: EditDetailsComponent, data: {navbar: "none", bgMethode: 'custom'},
        title: "Fiche de personnage — Modification — Naruto jdr"
    },
    {
        path: ':characterId', component: EditComponent, data: {navbar: "characterWithNav", bgMethode: "imageNoRepeat"}, resolve: {user: UserResolver},
        title: "Fiche de personnage — Naruto jdr"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharactersRoutingModule {
}

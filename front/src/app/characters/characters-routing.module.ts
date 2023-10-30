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
import {NormalNavbarComponent} from "../app/components/normal-navbar/normal-navbar.component";
import {CharacterNavbarComponent} from "./components/character-navbar/character-navbar.component";
import {BackNavbarComponent} from "../app/components/back-navbar/back-navbar.component";
import {NindoExemplesComponent} from "./components/nindo-exemples/nindo-exemples.component";
import {NotesComponent} from "./components/notes/notes.component";
import {ChakraSpesComponent} from "./components/chrakra-spes/chakra-spes.component";
import {SetChakraSpeComponent} from "./components/set-chakra-spe/set-chakra-spe.component";

export const routes: Routes = [
    {path: '', component: ListComponent, resolve: {user: UserResolver}, title: "Liste de personnages — Naruto jdr", data: {navbar: NormalNavbarComponent}},
    {path: 'creation', data: {navbar: NormalNavbarComponent}, children: [
            {path: '', redirectTo: '1', pathMatch: 'full'},
            {path: '1', component: FirstStepComponent, title: "Création de personnage — Étape 1 — Naruto jdr"},
            {path: '2', component: SecondStepComponent, title: "Création de personnage — Étape 2 — Naruto jdr"},
            {path: '2/exemples-nindo', component: NindoExemplesComponent, data: {navbar: BackNavbarComponent, bgClass: "no-repeat-image-bg", backAmount: 1, navbarText: "Historique"}, title: "Création de personnage — Exemples de nindo — Naruto jdr"},
            {path: '3', component: ThirdStepComponent, title: "Création de personnage — Étape 3 — Naruto jdr"}
        ]
    },
    {
        path: 'pretires',
        component: PredrawnComponent,
        resolve: {user: UserResolver},
        data: {bgClass: "no-repeat-image-bg", navbar: BackNavbarComponent, navbarText: "Liste de personnages"},
        title: "Personnages prétirés — Naruto jdr"
    },
    {
        path: ':characterId/base/:id', component: BaseComponent, data: {navbar: BackNavbarComponent, bgClass: "no-repeat-image-bg", backAmount: 2}, resolve: {user: UserResolver},
        title: "Base — Fiche de personnage — Naruto jdr"
    },
    {
        path: ':characterId/competence/:id', component: SkillComponent, data: {navbar: BackNavbarComponent, bgClass: "no-repeat-image-bg", backAmount: 2}, resolve: {user: UserResolver},
        title: "Compétence — Fiche de personnage — Naruto jdr"
    },
    {
        path: ':characterId/lignee', component: LineComponent, data: {navbar: CharacterNavbarComponent, bgClass: 'image-bg'},
        title: "Fiche de personnage — Naruto jdr"
    },
    {
        path: ':characterId/details', component: EditDetailsComponent, data: {bgClass: '!bg-black'}, resolve: {user: UserResolver},
        title: "Fiche de personnage — Modification — Naruto jdr"
    },
    {
        path: ':characterId/notes',
        component: NotesComponent,
        data: {navbar: BackNavbarComponent, bgClass: "no-repeat-image-bg", navbarText: "Fiche de personnage"},
        resolve: {user: UserResolver},
        title: "Fiche de personnage — Notes — Naruto jdr"
    },
    {
        path: ':characterId/specialisations-de-chakra',
        component: ChakraSpesComponent,
        data: {navbar: BackNavbarComponent, bgClass: "no-repeat-image-bg", navbarText: "Fiche de personnage"},
        resolve: {user: UserResolver},
        title: "Fiche de personnage — Spécialisations de chakra — Naruto jdr"
    },
    {
        path: ':characterId/specialisations-de-chakra/:id',
        component: SetChakraSpeComponent,
        data: {navbar: BackNavbarComponent, bgClass: "no-repeat-image-bg", navbarText: "Spécialisations de chakra"},
        resolve: {user: UserResolver},
        title: "Fiche de personnage — Spécialisations de chakra — Naruto jdr"
    },
    {
        path: ':characterId', component: EditComponent, data: {navbar: CharacterNavbarComponent, bgClass: "large-no-repeat-image-bg"}, resolve: {user: UserResolver},
        title: "Fiche de personnage — Naruto jdr"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharactersRoutingModule {
}

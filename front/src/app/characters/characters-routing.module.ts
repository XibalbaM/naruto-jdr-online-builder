import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, Routes} from '@angular/router';
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
import {map, Observable, of, zip} from "rxjs";

const characterNameFromRoute = (route: ActivatedRouteSnapshot): Observable<string> => {
    if (route.paramMap.has('characterId')) {
        return of(route.paramMap.get('characterId')!);
    } else {
        return of('');
    }
}

const baseNameFromRoute = (route: ActivatedRouteSnapshot): Observable<string> => {
    if (route.paramMap.has('id')) {
        return of(route.paramMap.get('id')!);
    } else {
        return of('');
    }
}

const skillNameFromRoute = (route: ActivatedRouteSnapshot): Observable<string> => {
    if (route.paramMap.has('characterId')) {
        return of(route.paramMap.get('characterId')!);
    } else {
        return of('');
    }
}

const setDataInText = (text: string, route: ActivatedRouteSnapshot): Observable<string> => {
    const observables: Observable<any>[] = [];
    if (text.includes('{{characterName}}')) {
        observables.push(characterNameFromRoute(route));
    } else {
        observables.push(of(''));
    }
    if (text.includes('{{baseName}}')) {
        observables.push(baseNameFromRoute(route));
    } else {
        observables.push(of(''));
    }
    if (text.includes('{{skillName}}')) {
        observables.push(skillNameFromRoute(route));
    } else {
        observables.push(of(''));
    }
    if (observables.length > 0) {
        return zip(observables).pipe(
            map((data) => {
                return text.replace('{{characterName}}', data[0]).replace('{{baseName}}', data[1]).replace('{{skillName}}', data[2]);
            })
        );
    }
    return of(text);
}

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
    {
        path: ':characterId/base/:id', component: BaseComponent, data: {navbar: "character", bgMethode: "imageNoRepeat"}, resolve: {user: UserResolver},
        title: (route) => setDataInText("Base {{baseName}} de {{characterName}}, Fiche de personnage — Naruto jdr", route)
    },
    {
        path: ':characterId/competence/:id', component: SkillComponent, data: {navbar: "character", bgMethode: "imageNoRepeat"}, resolve: {user: UserResolver},
        title: (route) => setDataInText("Compétence {{skillName}} de {{characterName}}, Fiche de personnage — Naruto jdr", route)
    },
    {
        path: ':characterId/lignee', component: LineComponent, data: {navbar: "characterWithNav", bgMethode: 'image'},
        title: (route) => setDataInText("Lignée de {{characterName}}, Fiche de personnage — Naruto jdr", route)
    },
    {
        path: ':characterId/details', component: EditDetailsComponent, data: {navbar: "none", bgMethode: 'custom'},
        title: (route) => setDataInText("{{characterName}}, Fiche de personnage — Modification — Naruto jdr", route)
    },
    {
        path: ':characterId', component: EditComponent, data: {navbar: "characterWithNav", bgMethode: "custom"}, resolve: {user: UserResolver},
        title: (route) => setDataInText("Mitsuo du clan Kurama, Fiche de personnage — Naruto jdr", route)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharactersRoutingModule {
}

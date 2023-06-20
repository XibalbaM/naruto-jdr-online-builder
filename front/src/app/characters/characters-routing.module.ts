import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {FirstStepComponent} from "./components/create/first-step/first-step.component";

const routes: Routes = [
    {path: '', component: ListComponent},
    {path: 'creation', redirectTo: 'creation/1', pathMatch: 'full'},
    {path: 'creation/1', component: FirstStepComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharactersRoutingModule {
}

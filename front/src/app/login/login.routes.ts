import { Routes} from '@angular/router';
import {InputComponent} from "./components/input/input.component";
import {CallbackComponent} from "./components/callback/callback.component";

export const loginRoutes: Routes = [
    {path: '', component: InputComponent, title: "Connexion — Ninjadex"},
    {path: ':token', component: CallbackComponent, title: "Connexion — Ninjadex"},
];
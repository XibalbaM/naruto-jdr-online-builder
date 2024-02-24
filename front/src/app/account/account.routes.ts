import { Routes} from '@angular/router';
import {EditComponent} from "./components/edit/edit.component";
import {DiscordComponent} from "./components/discord/discord.component";
import {DiscordDisconnectComponent} from "./components/discord-disconnect/discord-disconnect.component";
import {NormalNavbarComponent} from "../app/components/normal-navbar/normal-navbar.component";

export const accountRoutes: Routes = [
    {'path': '', component: EditComponent, title: "Profile — Naruto jdr", data: {navbar: NormalNavbarComponent}},
    {'path': 'discord', component: DiscordComponent, title: "Connexion a discord — Naruto jdr", data: {navbar: NormalNavbarComponent}},
    {'path': 'discord/deconnexion', component: DiscordDisconnectComponent, title: "Déconnexion de discord — Naruto jdr", data: {navbar: NormalNavbarComponent}},
];
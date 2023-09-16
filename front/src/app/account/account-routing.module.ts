import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditComponent} from "./components/edit/edit.component";
import {DiscordComponent} from "./components/discord/discord.component";
import {DiscordDisconnectComponent} from "./components/discord-disconnect/discord-disconnect.component";

const routes: Routes = [
  { 'path': '', component: EditComponent, title: "Profile — Naruto jdr" },
  { 'path': 'discord', component: DiscordComponent, title: "Connexion a discord — Naruto jdr" },
  { 'path': 'discord/deconnexion', component: DiscordDisconnectComponent, title: "Déconnexion de discord — Naruto jdr" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

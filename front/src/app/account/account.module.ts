import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EditComponent} from "./components/edit/edit.component";
import {SharedModule} from "../shared/shared.module";
import {DiscordComponent} from "./components/discord/discord.component";
import {DiscordDisconnectComponent} from './components/discord-disconnect/discord-disconnect.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        EditComponent,
        DiscordComponent,
        DiscordDisconnectComponent,
    ],
})
export class AccountModule {
}

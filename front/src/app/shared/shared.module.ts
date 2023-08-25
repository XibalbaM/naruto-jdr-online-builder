import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SpacerGraphicalComponent} from './components/spacer-graphical/spacer-graphical.component';
import {SpacerComponent} from './components/spacer/spacer.component';
import {RolesPipe} from "./pipes/roles.pipe";
import {RoleNamePipe} from './pipes/role-name.pipe';
import {XpToRankPipe} from './pipes/xp-to-rank.pipe';
import {IdToDataPipe} from './pipes/id-to-data.pipe';
import {CharacterToReamingXpPipe} from "./pipes/character-to-reaming-xp.pipe";
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
    declarations: [
        SpacerGraphicalComponent,
        SpacerComponent,
        RolesPipe,
        RoleNamePipe,
        XpToRankPipe,
        IdToDataPipe,
        CharacterToReamingXpPipe,
        TooltipComponent,
        TooltipDirective,
        SpinnerComponent,
        ModalComponent
    ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule
    ],
    exports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
        SpacerGraphicalComponent,
        SpacerComponent,
        RolesPipe,
        RoleNamePipe,
        XpToRankPipe,
        IdToDataPipe,
        CharacterToReamingXpPipe,
        TooltipDirective,
        SpinnerComponent,
        ModalComponent
    ],
    providers: [
        RoleNamePipe,
        XpToRankPipe,
		IdToDataPipe
    ]
})
export class SharedModule {
}

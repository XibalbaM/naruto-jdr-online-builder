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
import {TooltipComponent} from './components/tooltip/tooltip.component';
import {TooltipDirective} from './directives/tooltip.directive';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {ModalComponent} from './components/modal/modal.component';
import {BgComponent} from './components/bg/bg.component';
import {NgxPopperjsModule} from "ngx-popperjs";
import {AutosizeModule} from "ngx-autosize";
import {ArrowRightComponent} from './components/arrow-right/arrow-right.component';
import {ArrowBottomComponent} from './components/arrow-bottom/arrow-bottom.component';
import {DefaultProfilePictureComponent} from './components/default-profile-picture/default-profile-picture.component';
import {AdminLogoComponent} from './components/admin-logo/admin-logo.component';
import {CharactersLogoComponent} from './components/characters-logo/characters-logo.component';
import {PlusLogoComponent} from './components/plus-logo/plus-logo.component';
import {LongArrowLeftComponent} from './components/long-arrow-left/long-arrow-left.component';
import {LongArrowRightComponent} from './components/long-arrow-right/long-arrow-right.component';
import {PlusSymbolComponent} from './components/plus-symbol/plus-symbol.component';
import {MinusSymbolComponent} from './components/minus-symbol/minus-symbol.component';

@NgModule({
    imports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
        AutosizeModule,
        NgxPopperjsModule.forRoot({}),
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
        ModalComponent,
        BgComponent,
        ArrowRightComponent,
        ArrowBottomComponent,
        DefaultProfilePictureComponent,
        AdminLogoComponent,
        CharactersLogoComponent,
        PlusLogoComponent,
        LongArrowLeftComponent,
        LongArrowRightComponent,
        PlusSymbolComponent,
        MinusSymbolComponent
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
        ModalComponent,
        BgComponent,
        AutosizeModule,
        NgxPopperjsModule,
        ArrowRightComponent,
        DefaultProfilePictureComponent,
        AdminLogoComponent,
        CharactersLogoComponent,
        PlusLogoComponent,
        LongArrowLeftComponent,
        LongArrowRightComponent,
        PlusSymbolComponent,
        MinusSymbolComponent
    ],
    providers: [
        RoleNamePipe,
        XpToRankPipe,
        IdToDataPipe
    ]
})
export class SharedModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharactersRoutingModule} from './characters-routing.module';
import {ListComponent} from './components/list/list.component';
import {FirstStepComponent} from './components/create/first-step/first-step.component';
import {SharedModule} from "../shared/shared.module";
import {SecondStepComponent} from './components/create/second-step/second-step.component';
import {CharacterPreviewComponent} from './components/create/character-preview/character-preview.component';
import {ThirdStepComponent} from './components/create/third-step/third-step.component';
import {CharacterListPreviewComponent} from './components/character-list-preview/character-list-preview.component';
import {BaseComponent} from './components/base/base.component';
import {SkillComponent} from './components/skill/skill.component';
import {EditComponent} from './components/edit/edit.component';
import {SkillItemComponent} from './components/skill-item/skill-item.component';
import {CharacterToMaxSkillCountPipe} from "./pipes/character-to-max-skill-count.pipe";
import {CharacterToMaxChakraPipe} from './pipes/character-to-max-chakra.pipe';
import {CharacterToMaxChakraSpesPipe} from './pipes/character-to-max-chakra-spes.pipe';
import {CharacterToChakraControlPipe} from './pipes/character-to-chakra-control.pipe';
import { LineComponent } from './components/line/line.component';
import { SkillTypeToTypeNamePipe } from './pipes/skill-type-to-type-name.pipe';
import { CharacterToBaseLevelPipe } from './pipes/character-to-base-level.pipe';
import { CharacterToChakraSpeAmountPipe } from './pipes/character-to-chakra-spe-amount.pipe';
import { CharacterToChakraRegenPipe } from './pipes/character-to-chakra-regen.pipe';
import { CharacterToSkillNaturalLevelPipe } from './pipes/character-to-skill-natural-level.pipe';
import { CharacterToSkillTotalLevelPipe } from './pipes/character-to-skill-total-level.pipe';
import { CharacterToInterceptionsPipe } from './pipes/character-to-interceptions.pipe';
import {EditDetailsComponent} from "./components/edit-details/edit-details.component";
import { WeightChakraSpeEffectByAmountPipe } from './pipes/weight-chakra-spe-effect-by-amount.pipe';
import { CharacterToSkillReinforcementPipe } from './pipes/character-to-skill-reinforcement.pipe';
import { PredrawnComponent } from './components/predrawn/predrawn.component';
import { PredrawnPreviewComponent } from './components/predrawn-preview/predrawn-preview.component';

@NgModule({
    declarations: [
        ListComponent,
        FirstStepComponent,
        SecondStepComponent,
        CharacterPreviewComponent,
        ThirdStepComponent,
        CharacterToMaxSkillCountPipe,
        CharacterListPreviewComponent,
        BaseComponent,
        SkillComponent,
        EditComponent,
        SkillItemComponent,
        CharacterToMaxChakraPipe,
        CharacterToMaxChakraSpesPipe,
        CharacterToChakraControlPipe,
        LineComponent,
        SkillTypeToTypeNamePipe,
        CharacterToBaseLevelPipe,
        CharacterToChakraSpeAmountPipe,
        CharacterToChakraRegenPipe,
        CharacterToSkillNaturalLevelPipe,
        CharacterToSkillTotalLevelPipe,
        CharacterToInterceptionsPipe,
        EditDetailsComponent,
        WeightChakraSpeEffectByAmountPipe,
        CharacterToSkillReinforcementPipe,
        PredrawnComponent,
        PredrawnPreviewComponent
    ],
    imports: [
        CommonModule,
        CharactersRoutingModule,
        SharedModule
    ],
    providers: [
        CharacterToChakraControlPipe,
        CharacterToBaseLevelPipe,
        CharacterToMaxChakraPipe,
        CharacterToChakraSpeAmountPipe,
        CharacterToSkillNaturalLevelPipe,
        CharacterToSkillTotalLevelPipe
    ]
})
export class CharactersModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharactersRoutingModule} from './characters-routing.module';
import {ListComponent} from './components/list/list.component';
import {FirstStepComponent} from './components/create/first-step/first-step.component';
import {SharedModule} from "../shared/shared.module";

import {CharacterToMaxSkillCountPipe} from "./pipes/character-to-max-skill-count.pipe";
import {CharacterToMaxChakraPipe} from './pipes/character-to-max-chakra.pipe';
import {CharacterToMaxChakraSpesPipe} from './pipes/character-to-max-chakra-spes.pipe';
import {CharacterToChakraControlPipe} from './pipes/character-to-chakra-control.pipe';
import { SkillTypeToTypeNamePipe } from './pipes/skill-type-to-type-name.pipe';
import { CharacterToBaseLevelPipe } from './pipes/character-to-base-level.pipe';
import { CharacterToChakraSpeAmountPipe } from './pipes/character-to-chakra-spe-amount.pipe';
import { CharacterToChakraRegenPipe } from './pipes/character-to-chakra-regen.pipe';
import { CharacterToSkillNaturalLevelPipe } from './pipes/character-to-skill-natural-level.pipe';
import { CharacterToSkillTotalLevelPipe } from './pipes/character-to-skill-total-level.pipe';
import { CharacterToInterceptionsPipe } from './pipes/character-to-interceptions.pipe';
import { WeightChakraSpeEffectByAmountPipe } from './pipes/weight-chakra-spe-effect-by-amount.pipe';
import { CharacterToSkillReinforcementPipe } from './pipes/character-to-skill-reinforcement.pipe';

@NgModule({
    declarations: [
        ListComponent,
        FirstStepComponent
        CharacterToMaxSkillCountPipe,
        CharacterToMaxChakraPipe,
        CharacterToMaxChakraSpesPipe,
        CharacterToChakraControlPipe,
        SkillTypeToTypeNamePipe,
        CharacterToBaseLevelPipe,
        CharacterToChakraSpeAmountPipe,
        CharacterToChakraRegenPipe,
        CharacterToSkillNaturalLevelPipe,
        CharacterToSkillTotalLevelPipe,
        CharacterToInterceptionsPipe,
        WeightChakraSpeEffectByAmountPipe,
        CharacterToSkillReinforcementPipe
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

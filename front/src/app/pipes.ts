import {IdToDataPipe} from "./utils/pipes/id-to-data.pipe";
import {XpToRankPipe} from "./utils/pipes/xp-to-rank.pipe";
import {CharacterToChakraControlPipe} from "./characters/pipes/character-to-chakra-control.pipe";
import {CharacterToBaseLevelPipe} from "./characters/pipes/character-to-base-level.pipe";
import {CharacterToChakraSpeAmountPipe} from "./characters/pipes/character-to-chakra-spe-amount.pipe";
import {CharacterToMaxChakraPipe} from "./characters/pipes/character-to-max-chakra.pipe";
import {CharacterToSkillNaturalLevelPipe} from "./characters/pipes/character-to-skill-natural-level.pipe";

export const pipes = [
    IdToDataPipe,
    XpToRankPipe,
    CharacterToChakraControlPipe,
    CharacterToBaseLevelPipe,
    CharacterToChakraSpeAmountPipe,
    CharacterToMaxChakraPipe,
    CharacterToSkillNaturalLevelPipe
]
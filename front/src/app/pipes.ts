import {IdToDataPipe} from "./utils/pipes/id-to-data.pipe";
import {XpToRankPipe} from "./utils/pipes/xp-to-rank.pipe";
import {CharacterToChakraControlPipe} from "./characters/pipes/character-to-chakra-control.pipe";
import {CharacterToBaseLevelPipe} from "./characters/pipes/character-to-base-level.pipe";
import {CharacterToChakraSpeAmountPipe} from "./characters/pipes/character-to-chakra-spe-amount.pipe";
import {CharacterToMaxChakraPipe} from "./characters/pipes/character-to-max-chakra.pipe";
import {CharacterToSkillNaturalLevelPipe} from "./characters/pipes/character-to-skill-natural-level.pipe";
import {RoleNamePipe} from "./utils/pipes/role-name.pipe";
import {CharacterToMaxChakraSpesPipe} from "./characters/pipes/character-to-max-chakra-spes.pipe";
import {CharacterToSkillTotalLevelPipe} from "./characters/pipes/character-to-skill-total-level.pipe";
import {CharacterToMaxSkillCountPipe} from "./characters/pipes/character-to-max-skill-count.pipe";

export const pipes = [
    IdToDataPipe,
    XpToRankPipe,
    CharacterToChakraControlPipe,
    CharacterToBaseLevelPipe,
    CharacterToChakraSpeAmountPipe,
    CharacterToMaxChakraPipe,
    CharacterToSkillNaturalLevelPipe,
    RoleNamePipe,
    CharacterToMaxChakraSpesPipe,
    CharacterToSkillTotalLevelPipe,
    CharacterToMaxSkillCountPipe
]
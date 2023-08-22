import {Pipe, PipeTransform} from '@angular/core';
import {CharacterToSkillNaturalLevelPipe} from "./character-to-skill-natural-level.pipe";
import {CharacterToBaseLevelPipe} from "./character-to-base-level.pipe";
import {DataService} from "../../app/services/data.service";
import {IdToDataPipe} from "../../shared/pipes/id-to-data.pipe";
import Character from "../../app/models/character.model";
import {map, Observable} from "rxjs";
import {CharacterToSkillTotalLevelPipe} from "./character-to-skill-total-level.pipe";

@Pipe({
    name: 'characterToSkillReinforcement'
})
export class CharacterToSkillReinforcementPipe implements PipeTransform {

    constructor(private characterToSkillTotalLevel: CharacterToSkillTotalLevelPipe) {}

    transform(character: Character, skillName: string): number;
    transform(character: Observable<Character>, skillName: string): Observable<number>;
    transform(character: Character | Observable<Character>, skillName: string): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => this.processCharacter(character, skillName))
            );
        } else {
            return this.processCharacter(character, skillName);
        }
    }

    processCharacter(character: Character, skillName: string): number {
        return Math.floor(this.characterToSkillTotalLevel.transform(character, skillName) / 2);
    }
}

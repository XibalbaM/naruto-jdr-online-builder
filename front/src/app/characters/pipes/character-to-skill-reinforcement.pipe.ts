import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {map, Observable} from "rxjs";
import {CharacterToSkillTotalLevelPipe} from "./character-to-skill-total-level.pipe";

@Pipe({
    name: 'characterToSkillReinforcement',
    standalone: true
})
export class CharacterToSkillReinforcementPipe implements PipeTransform {

    constructor(private characterToSkillTotalLevel: CharacterToSkillTotalLevelPipe) {
    }

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

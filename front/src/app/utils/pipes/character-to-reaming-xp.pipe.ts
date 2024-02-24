import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {map, Observable} from "rxjs";

@Pipe({
    name: 'characterToReamingXp',
    standalone: true
})
export class CharacterToReamingXpPipe implements PipeTransform {

    readonly xpUsedByBasePerLevel = {
        0: 0,
        1: 0,
        2: 15,
        3: 35,
        4: 60,
        5: 90,
        6: 125,
        7: 165,
        8: 210,
        9: 260,
        10: 315,
        11: 375,
        12: 440,
        13: 510,
        14: 585,
        15: 675,
        16: 775,
    }
    readonly xpUsedBySkillPerLevel = {
        0: 0,
        1: 0,
        2: 2,
        3: 5,
        4: 9,
        5: 14,
        6: 20,
        7: 27,
        8: 35,
        9: 44,
        10: 54,
        11: 65,
        12: 77,
        13: 90,
        14: 104,
        15: 119,
        16: 135,
        17: 152,
        18: 170,
    }

    transform(character: Character): number;
    transform(character: Observable<Character>): Observable<number>;
    transform(character: Character | Observable<Character>): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map((char) => this.processCharacter(char))
            );
        } else {
            return this.processCharacter(character);
        }
    }

    private processCharacter(character: Character): number {
        let xpUsed = 0;
        for (const skill of character.commonSkills) {
            xpUsed += this.xpUsedBySkillPerLevel[skill as keyof typeof this.xpUsedBySkillPerLevel];
        }
        for (const skill of character.customSkills) {
            xpUsed += this.xpUsedBySkillPerLevel[skill.level as keyof typeof this.xpUsedBySkillPerLevel];
        }
        for (const base of character.bases) {
            xpUsed += this.xpUsedByBasePerLevel[base as keyof typeof this.xpUsedByBasePerLevel];
        }
        return character.xp - xpUsed;
    }
}
import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {map, Observable} from "rxjs";

@Pipe({
    name: 'characterToMaxSkillCount',
    standalone: true
})
export class CharacterToMaxSkillCountPipe implements PipeTransform {

    transform(character: Character): number;
    transform(character: Observable<Character>): Observable<number>;
    transform(character: Character | Observable<Character>): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => this.processCharacter(character))
            );
        } else {
            return this.processCharacter(character);
        }
    }

    processCharacter(character: Character): number {
        const highestBase = character.bases.map(base => base.level).sort((a, b) => b - a)[0];
        return 5 + (highestBase >= 5 ? 1 + (highestBase >= 7 ? 1 + (highestBase >= 10 ? 1 : 0) : 0) : 0);
    }
}
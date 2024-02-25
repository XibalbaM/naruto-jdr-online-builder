import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {map, Observable} from "rxjs";
import {CharacterToBaseLevelPipe} from "./character-to-base-level.pipe";

@Pipe({
    name: 'characterToChakraControl',
    standalone: true
})
export class CharacterToChakraControlPipe implements PipeTransform {

    constructor(private characterToBaseLevel: CharacterToBaseLevelPipe) {
    }

    transform(character: Observable<Character>): Observable<number>;
    transform(character: Character): number;
    transform(character: Observable<Character> | Character): Observable<number> | number {
        if (character instanceof Observable)
            return character.pipe(
                map(character => this.processCharacter(character))
            );
        else
            return this.processCharacter(character);
    }

    processCharacter(character: Character): number {
        return this.characterToBaseLevel.transform(character, 'COR') + this.characterToBaseLevel.transform(character, 'ESP');
    }
}
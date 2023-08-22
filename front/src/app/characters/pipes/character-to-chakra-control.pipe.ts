import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {DataService} from "../../app/services/data.service";
import {map, Observable} from "rxjs";
import {CharacterToBaseLevelPipe} from "./character-to-base-level.pipe";

@Pipe({
    name: 'characterToChakraControl'
})
export class CharacterToChakraControlPipe implements PipeTransform {

    constructor(private dataService: DataService, private characterToBaseLevel: CharacterToBaseLevelPipe) {
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
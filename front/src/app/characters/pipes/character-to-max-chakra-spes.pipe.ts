import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {CharacterToChakraControlPipe} from "./character-to-chakra-control.pipe";
import {map, Observable} from "rxjs";

@Pipe({
    name: 'characterToMaxChakraSpes',
    standalone: true,
    pure: false
})
export class CharacterToMaxChakraSpesPipe implements PipeTransform {

    constructor(private characterToChakraControl: CharacterToChakraControlPipe) {
    }

    transform(character: Character): number
    transform(character: Observable<Character>): Observable<number>
    transform(character: Observable<Character> | Character): Observable<number> | number {
        if (character instanceof Observable)
            return character.pipe(map(character => this.processCharacter(character)));
        else
            return this.processCharacter(character);
    }

    processCharacter(character: Character): number {
        const chakraControl = this.characterToChakraControl.transform(character);
        let maxChakraSpes = 1;
        if (chakraControl >= 5) {
            maxChakraSpes += 1;
        }
        if (chakraControl >= 10) {
            maxChakraSpes += 2;
        }
        if (chakraControl >= 14) {
            maxChakraSpes += 2;
        }
        if (chakraControl >= 20) {
            maxChakraSpes += 3;
        }
        if (chakraControl >= 24) {
            maxChakraSpes += 5;
        }
        return maxChakraSpes;
    }
}
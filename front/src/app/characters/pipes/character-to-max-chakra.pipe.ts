import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {CharacterToChakraControlPipe} from "./character-to-chakra-control.pipe";
import {map, Observable} from "rxjs";
import {CharacterToChakraSpeAmountPipe} from "./character-to-chakra-spe-amount.pipe";

@Pipe({
    name: 'characterToMaxChakra',
    standalone: true
})
export class CharacterToMaxChakraPipe implements PipeTransform {

    constructor(private characterToChakraControl: CharacterToChakraControlPipe, private characterToChakraSpeAmount: CharacterToChakraSpeAmountPipe) {
    }

    transform(character: Character): number;
    transform(character: Observable<Character>): Observable<number>;
    transform(character: Observable<Character> | Character): Observable<number> | number {
        if (character instanceof Observable)
            return character.pipe(
                map(character => this.processCharacter(character))
            );
        else
            return this.processCharacter(character);
    }

    processCharacter(character: Character): number {
        return (50 * this.characterToChakraControl.transform(character))
            + (100 * this.characterToChakraSpeAmount.transform(character, "Colossal"))
            + (50 * this.characterToChakraSpeAmount.transform(character, "Endurci"))
            + (50 * this.characterToChakraSpeAmount.transform(character, "Impérieux"));
    }
}
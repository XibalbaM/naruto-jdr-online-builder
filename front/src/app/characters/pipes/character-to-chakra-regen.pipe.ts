import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {map, Observable} from "rxjs";
import {CharacterToMaxChakraPipe} from "./character-to-max-chakra.pipe";
import {CharacterToChakraSpeAmountPipe} from "./character-to-chakra-spe-amount.pipe";

@Pipe({
    name: 'characterToChakraRegen'
})
export class CharacterToChakraRegenPipe implements PipeTransform {

    constructor(private characterToMaxChakra: CharacterToMaxChakraPipe, private characterToChakraSpeAmount: CharacterToChakraSpeAmountPipe) {}

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
        return Math.floor(this.characterToMaxChakra.transform(character) * (1 + this.characterToChakraSpeAmount.transform(character, 'Inépuisable')) / 100);
    }
}
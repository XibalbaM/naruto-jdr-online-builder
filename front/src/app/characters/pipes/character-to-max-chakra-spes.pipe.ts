import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {CharacterToChakraControlPipe} from "./character-to-chakra-control.pipe";
import {map, Observable} from "rxjs";

@Pipe({
    name: 'characterToMaxChakraSpes'
})
export class CharacterToMaxChakraSpesPipe implements PipeTransform {

    readonly chakraSpesPerChakraControl = {
        2: 1,
        3: 1,
        4: 1,
        5: 2,
        6: 2,
        7: 2,
        8: 2,
        9: 2,
        10: 4,
        11: 4,
        12: 4,
        13: 4,
        14: 6,
        15: 6,
        16: 6,
        17: 6,
        18: 6,
        19: 6,
        20: 9,
    }

    constructor(private characterToChakraControl: CharacterToChakraControlPipe) {}

    transform(character: Character): number
    transform(character: Observable<Character>): Observable<number>
    transform(character: Observable<Character> | Character): Observable<number> | number {
        if (character instanceof Character)
            return this.chakraSpesPerChakraControl[this.characterToChakraControl.transform(character) as keyof typeof this.chakraSpesPerChakraControl];
        else
            return character.pipe(map(character => this.chakraSpesPerChakraControl[this.characterToChakraControl.transform(character) as keyof typeof this.chakraSpesPerChakraControl]));
    }
}
import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {chakraControl} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'characterToChakraControl',
    standalone: true,
    pure: false
})
export class CharacterToChakraControlPipe implements PipeTransform {

    constructor() {
    }

    transform(character: Observable<Character>): Observable<number>;
    transform(character: Character): number;
    transform(character: Observable<Character> | Character): Observable<number> | number {
        if (character instanceof Observable)
            return character.pipe(
                map(character => chakraControl(character))
            );
        else
            return chakraControl(character);
    }
}
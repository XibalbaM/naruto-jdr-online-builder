import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {maxChakraSpes} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'characterToMaxChakraSpes',
    standalone: true,
    pure: false
})
export class CharacterToMaxChakraSpesPipe implements PipeTransform {

    transform(character: Character): number
    transform(character: Observable<Character>): Observable<number>
    transform(character: Observable<Character> | Character): Observable<number> | number {
        if (character instanceof Observable)
            return character.pipe(map(character => maxChakraSpes(character)));
        else
            return maxChakraSpes(character);
    }
}
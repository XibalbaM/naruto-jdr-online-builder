import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {totalXp} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'characterToReamingXp',
    standalone: true,
    pure: false
})
export class CharacterToReamingXpPipe implements PipeTransform {

    transform(character: Character): number;
    transform(character: Observable<Character>): Observable<number>;
    transform(character: Character | Observable<Character>): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map((char) => totalXp(char))
            );
        } else {
            return totalXp(character);
        }
    }
}
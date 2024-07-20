import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.interface";
import {DataService} from "../../app/services/data.service";
import {map, Observable} from "rxjs";
import {baseLevel} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'characterToBaseLevel',
    standalone: true,
    pure: false
})
export class CharacterToBaseLevelPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(character: Character, baseShortName: string): number;
    transform(character: Observable<Character>, baseShortName: string): Observable<number>;
    transform(character: Character | Observable<Character>, baseShortName: string): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => baseLevel(character, baseShortName, this.dataService.bases))
            );
        } else {
            return baseLevel(character, baseShortName, this.dataService.bases);
        }
    }
}
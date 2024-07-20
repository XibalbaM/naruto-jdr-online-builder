import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {DataService} from "../../app/services/data.service";
import {interceptions} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'characterToInterceptions',
    standalone: true,
    pure: false
})
export class CharacterToInterceptionsPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(character: Character, type: 'TAI' | 'ARM'): number;
    transform(character: Observable<Character>, type: 'TAI' | 'ARM'): Observable<number>;
    transform(character: Character | Observable<Character>, type: 'TAI' | 'ARM'): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => interceptions(character, type, this.dataService.bases))
            );
        } else {
            return interceptions(character, type, this.dataService.bases);
        }
    }
}
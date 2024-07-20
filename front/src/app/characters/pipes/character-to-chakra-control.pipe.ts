import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {chakraControl} from "naruto-jdr-online-builder-common/src/utils/character.utils";
import {DataService} from "../../app/services/data.service";

@Pipe({
    name: 'characterToChakraControl',
    standalone: true,
    pure: false
})
export class CharacterToChakraControlPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(character: Observable<Character>): Observable<number>;
    transform(character: Character): number;
    transform(character: Observable<Character> | Character): Observable<number> | number {
        if (character instanceof Observable)
            return character.pipe(
                map(character => chakraControl(character, this.dataService.bases))
            );
        else
            return chakraControl(character, this.dataService.bases);
    }
}
import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {DataService} from "../../app/services/data.service";
import {chakraRegen} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'characterToChakraRegen',
    standalone: true,
    pure: false
})
export class CharacterToChakraRegenPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(character: Character): number;
    transform(character: Observable<Character>): Observable<number>;
    transform(character: Character | Observable<Character>): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => chakraRegen(character, this.dataService.clans, this.dataService.bases, this.dataService.chakraSpes)),
            );
        } else {
            return chakraRegen(character, this.dataService.clans, this.dataService.bases, this.dataService.chakraSpes);
        }
    }
}
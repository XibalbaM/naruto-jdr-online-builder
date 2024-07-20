import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from "../../app/services/data.service";
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {chakraSpeAmount} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'characterToChakraSpeAmount',
    standalone: true,
    pure: false
})
export class CharacterToChakraSpeAmountPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(character: Character, speName: string): number;
    transform(character: Observable<Character>, speName: string): Observable<number>;
    transform(character: Character | Observable<Character>, speName: string): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => chakraSpeAmount(character, speName, this.dataService.chakraSpes))
            );
        } else {
            return chakraSpeAmount(character, speName, this.dataService.chakraSpes);
        }
    }
}
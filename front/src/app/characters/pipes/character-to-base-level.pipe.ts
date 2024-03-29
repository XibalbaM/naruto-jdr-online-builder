import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {DataService} from "../../app/services/data.service";
import {map, Observable} from "rxjs";

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
                map(character => this.processCharacter(character, baseShortName))
            );
        } else {
            return this.processCharacter(character, baseShortName);
        }
    }

    processCharacter(character: Character, baseShortName: string): number {
        return character.bases[this.dataService.bases.find(base => base.shortName === baseShortName)?._id || 0];
    }
}
import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {map, Observable} from "rxjs";
import {DataService} from "../../app/services/data.service";

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
                map(character => this.processCharacter(character, type))
            );
        } else {
            return this.processCharacter(character, type);
        }
    }

    processCharacter(character: Character, type: 'TAI' | 'ARM'): number {
        const baseLevel = character.bases[this.dataService.bases.find(base => base.shortName === type)!._id];
        return Math.max(1, Math.floor(baseLevel / 2));
    }
}
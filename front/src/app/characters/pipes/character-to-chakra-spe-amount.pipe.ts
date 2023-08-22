import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from "../../app/services/data.service";
import Character from "../../app/models/character.model";
import {map, Observable} from "rxjs";

@Pipe({
    name: 'characterToChakraSpeAmount'
})
export class CharacterToChakraSpeAmountPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(character: Character, speName: string): number;
    transform(character: Observable<Character>, speName: string): Observable<number>;
    transform(character: Character | Observable<Character>, speName: string): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => this.processCharacter(character, speName))
            );
        } else {
            return this.processCharacter(character, speName);
        }
    }

    processCharacter(character: Character, speName: string): number {
        return character.chakraSpes.find(spe => spe.spe === this.dataService.chakraSpes.getValue().find(spe => spe.name === speName)?._id)?.level || 0;
    }
}
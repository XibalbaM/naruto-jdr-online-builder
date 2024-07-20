import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.interface";
import {CharacterToChakraControlPipe} from "./character-to-chakra-control.pipe";
import {map, Observable} from "rxjs";
import {CharacterToChakraSpeAmountPipe} from "./character-to-chakra-spe-amount.pipe";
import {IdToDataPipe} from "../../utils/pipes/id-to-data.pipe";
import {DataService} from "../../app/services/data.service";
import {maxChakra} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'characterToMaxChakra',
    standalone: true,
    pure: false
})
export class CharacterToMaxChakraPipe implements PipeTransform {

    constructor(private characterToChakraControl: CharacterToChakraControlPipe, private characterToChakraSpeAmount: CharacterToChakraSpeAmountPipe, private idToData: IdToDataPipe,
                private dataService: DataService) {
    }

    transform(character: Character): number;
    transform(character: Observable<Character>): Observable<number>;
    transform(character: Observable<Character> | Character): Observable<number> | number {
        if (character instanceof Observable)
            return character.pipe(
                map(character => maxChakra(character, this.dataService.clans, this.dataService.bases, this.dataService.chakraSpes))
            );
        else
            return maxChakra(character, this.dataService.clans, this.dataService.bases, this.dataService.chakraSpes);
    }
}
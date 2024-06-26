import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.model";
import {CharacterToChakraControlPipe} from "./character-to-chakra-control.pipe";
import {map, Observable} from "rxjs";
import {CharacterToChakraSpeAmountPipe} from "./character-to-chakra-spe-amount.pipe";
import {IdToDataPipe} from "../../utils/pipes/id-to-data.pipe";
import {DataService} from "../../app/services/data.service";

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
                map(character => this.processCharacter(character))
            );
        else
            return this.processCharacter(character);
    }

    processCharacter(character: Character): number {
        let clanBonus = 0;
        let clan = this.idToData.transform(character.clan, this.dataService.clans);
        switch (clan?._id) {
            case "64e8d2def43b640ea9eae3b9": // Eshimuro
                clanBonus = 50 * character.bases[6];
                break;
        }
        return (50 * this.characterToChakraControl.transform(character))
            + (100 * this.characterToChakraSpeAmount.transform(character, "Colossal"))
            + (50 * this.characterToChakraSpeAmount.transform(character, "Endurci"))
            + (50 * this.characterToChakraSpeAmount.transform(character, "Impérieux"))
            + clanBonus;
    }
}
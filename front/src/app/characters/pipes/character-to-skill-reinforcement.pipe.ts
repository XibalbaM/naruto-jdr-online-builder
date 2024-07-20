import {Pipe, PipeTransform} from '@angular/core';
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {skillReinforcement} from "naruto-jdr-online-builder-common/src/utils/character.utils";
import {DataService} from "../../app/services/data.service";

@Pipe({
    name: 'characterToSkillReinforcement',
    standalone: true,
    pure: false
})
export class CharacterToSkillReinforcementPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(character: Character, skillName: string): number;
    transform(character: Observable<Character>, skillName: string): Observable<number>;
    transform(character: Character | Observable<Character>, skillName: string): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => skillReinforcement(character, skillName, this.dataService.commonSkills, this.dataService.customSkills))
            );
        } else {
            return skillReinforcement(character, skillName, this.dataService.commonSkills, this.dataService.customSkills);
        }
    }
}

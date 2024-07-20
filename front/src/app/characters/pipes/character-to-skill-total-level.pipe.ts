import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from "../../app/services/data.service";
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {skillTotalLevel} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'characterToSkillTotalLevel',
    standalone: true,
    pure: false
})
export class CharacterToSkillTotalLevelPipe implements PipeTransform {

    constructor(private dataService: DataService) {
    }

    transform(character: Character, skillName: string): number;
    transform(character: Observable<Character>, skillName: string): Observable<number>;
    transform(character: Character | Observable<Character>, skillName: string): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => skillTotalLevel(character, skillName, this.dataService.commonSkills, this.dataService.customSkills))
            );
        } else {
            return skillTotalLevel(character, skillName, this.dataService.commonSkills, this.dataService.customSkills);
        }
    }
}
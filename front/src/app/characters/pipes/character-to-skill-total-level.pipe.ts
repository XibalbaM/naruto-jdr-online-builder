import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from "../../app/services/data.service";
import Character from "../../app/models/character.interface";
import {map, Observable} from "rxjs";
import {CharacterToSkillNaturalLevelPipe} from "./character-to-skill-natural-level.pipe";
import {CharacterToBaseLevelPipe} from "./character-to-base-level.pipe";
import {IdToDataPipe} from "../../utils/pipes/id-to-data.pipe";

@Pipe({
    name: 'characterToSkillTotalLevel',
    standalone: true,
    pure: false
})
export class CharacterToSkillTotalLevelPipe implements PipeTransform {

    constructor(private characterToSkillNaturalLevel: CharacterToSkillNaturalLevelPipe, private characterToBaseLevel: CharacterToBaseLevelPipe,
                private dataService: DataService, private idToData: IdToDataPipe) {
    }

    transform(character: Character, skillName: string): number;
    transform(character: Observable<Character>, skillName: string): Observable<number>;
    transform(character: Character | Observable<Character>, skillName: string): number | Observable<number> {
        if (character instanceof Observable) {
            return character.pipe(
                map(character => this.processCharacter(character, skillName))
            );
        } else {
            return this.processCharacter(character, skillName);
        }
    }

    processCharacter(character: Character, skillName: string): number {
        const skill = this.dataService.commonSkills.find(skill => skill.name === skillName)! || this.dataService.customSkills.find(skill => skill.name === skillName)!;
        const base = this.idToData.transform(skill.base, this.dataService.bases)!;
        return this.characterToSkillNaturalLevel.transform(character, skillName) + this.characterToBaseLevel.transform(character, base.shortName);
    }
}
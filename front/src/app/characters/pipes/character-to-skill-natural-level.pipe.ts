import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from "../../app/services/data.service";
import Character from "../../app/models/character.model";
import {map, Observable} from "rxjs";

@Pipe({
    name: 'characterToSkillNaturalLevel',
    standalone: true
})
export class CharacterToSkillNaturalLevelPipe implements PipeTransform {

    constructor(private dataService: DataService) {
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
        const skillId = this.dataService.commonSkills.getValue().find(skill => skill.name === skillName)?._id;
        if (skillId !== undefined) {
            return character.commonSkills[Number(skillId)];
        } else {
            const customSkill = this.dataService.customSkills.getValue().find(skill => skill.name === skillName)!;
            return character.customSkills.find(skill => skill.skill === customSkill._id)?.level || 0;
        }
    }
}
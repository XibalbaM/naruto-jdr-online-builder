import {Pipe, PipeTransform} from '@angular/core';
import CustomSkill from "../../app/models/skill.interface";
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";
import {skillTypeName} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Pipe({
    name: 'skillToTypeName',
    standalone: true
})
export class SkillToTypeNamePipe implements PipeTransform {

    transform(value: Skill | CustomSkill, short: boolean = false): string {
        if (short) {
            let words = skillTypeName(value).split(' ');
            words.shift();
            return words.join(' ');
        } else
            return skillTypeName(value);
    }
}
import {Pipe, PipeTransform} from '@angular/core';
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";
import CustomSkill from "../../app/models/skill.interface";

@Pipe({
    name: 'skillVillageListToString',
    standalone: true
})
export class SkillVillageListToStringPipe implements PipeTransform {

    transform(value: Skill | CustomSkill): String {
        if (!value.villages || value.villages.length === 0) {
            return "Par défaut";
        }
        return value.villages.join(', ');
    }
}
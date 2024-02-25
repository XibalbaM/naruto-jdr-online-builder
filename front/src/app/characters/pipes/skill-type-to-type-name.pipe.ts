import {Pipe, PipeTransform} from '@angular/core';
import {CustomSkill, Skill} from "../../app/models/skill.model";

@Pipe({
    name: 'skillToTypeName',
    standalone: true
})
export class SkillToTypeNamePipe implements PipeTransform {

    transform(value: Skill): string {
        if (value instanceof CustomSkill) {
            switch (value.type) {
                case "combat":
                    return "Compétence de combat";
                case "terrain":
                    return "Compétence de terrain";
                case "clan":
                    return "Compétence de clan";
                default:
                    return "";
            }
        } else {
            return "Compétence commune";
        }
    }
}
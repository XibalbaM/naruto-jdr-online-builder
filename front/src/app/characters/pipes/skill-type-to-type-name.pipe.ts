import {Pipe, PipeTransform} from '@angular/core';
import Skill from "common/src/interfaces/skill.interface";
import CustomSkill from "../../app/models/skill.interface";

@Pipe({
    name: 'skillToTypeName',
    standalone: true
})
export class SkillToTypeNamePipe implements PipeTransform {

    transform(value: Skill | CustomSkill): string {
        if (typeof value._id === "number") {
            return "Compétence commune";
        } else {
            switch ((value as CustomSkill).type) {
                case "combat":
                    return "Compétence de combat";
                case "terrain":
                    return "Compétence de terrain";
                case "clan":
                    return "Compétence de clan";
                default:
                    return "Compétence commune";
            }
        }
    }
}
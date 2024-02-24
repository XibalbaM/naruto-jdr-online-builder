import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'skillTypeToTypeName',
    standalone: true
})
export class SkillTypeToTypeNamePipe implements PipeTransform {

    transform(value: "common" | "combat" | "terrain" | "clan" | undefined): string {
        switch (value) {
            case "common":
                return "Compétence commune";
            case "combat":
                return "Compétence de combat";
            case "terrain":
                return "Compétence de terrain";
            case "clan":
                return "Compétence de clan";
            default:
                return "";
        }
    }
}
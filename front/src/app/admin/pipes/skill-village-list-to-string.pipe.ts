import {Pipe, PipeTransform} from '@angular/core';
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";
import CustomSkill from "../../app/models/skill.interface";
import {IdToDataPipe} from "../../utils/pipes/id-to-data.pipe";
import {DataService} from "../../app/services/data.service";

@Pipe({
    name: 'skillVillageListToString',
    standalone: true
})
export class SkillVillageListToStringPipe implements PipeTransform {

    constructor(private idToDataPipe: IdToDataPipe, private dataService: DataService) {
    }

    transform(value: Skill | CustomSkill): String {
        if (!value.villages || value.villages.length === 0) {
            return "Par défaut";
        }
        return value.villages.map(village => this.idToDataPipe.transform(village, this.dataService.villages)?.name).join(', ');
    }
}
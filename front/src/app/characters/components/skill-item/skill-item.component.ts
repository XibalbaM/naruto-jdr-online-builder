import {Component, EventEmitter, Input, Output} from '@angular/core';
import Skill from "../../../app/models/skill.model";
import {DataService} from "../../../app/services/data.service";

@Component({
    selector: 'app-skill-item',
    templateUrl: './skill-item.component.html',
    styleUrls: ['./skill-item.component.scss']
})
export class SkillItemComponent {

    @Input() skill!: { skill: Skill, level: number };
    @Input() baseLevel!: number;
    @Output() changeValue = new EventEmitter<number>();

    constructor(protected dataService: DataService) {
    }
}
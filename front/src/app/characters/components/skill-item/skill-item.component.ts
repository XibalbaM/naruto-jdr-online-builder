import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from '../../../utils/pipes/id-to-data.pipe';
import {PlusSymbolComponent} from '../../../utils/components/plus-symbol/plus-symbol.component';
import {MinusSymbolComponent} from '../../../utils/components/minus-symbol/minus-symbol.component';
import {RouterLink} from '@angular/router';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {NgxPopperjsContentComponent, NgxPopperjsDirective, NgxPopperjsTriggers} from "ngx-popperjs";
import CustomSkill from "../../../app/models/skill.interface";
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-skill-item',
    templateUrl: './skill-item.component.html',
    styleUrls: ['./skill-item.component.scss'],
    standalone: true,
    imports: [SpacerComponent, RouterLink, MinusSymbolComponent, PlusSymbolComponent, IdToDataPipe, NgxPopperjsContentComponent, NgxPopperjsDirective, NgIf]
})
export class SkillItemComponent {

    @Input() isEditable!: boolean;
    @Input() skill!: { skill: Skill | CustomSkill, level: number };
    @Input() baseLevel!: number;
    @Input() isCommon !: boolean
    @Output() changeValue = new EventEmitter<number>();

    constructor(protected dataService: DataService) {
    }

    protected readonly NgxPopperjsTriggers = NgxPopperjsTriggers;
}
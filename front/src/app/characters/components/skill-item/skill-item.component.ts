import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from '../../../utils/pipes/id-to-data.pipe';
import {PlusSymbolComponent} from '../../../utils/components/plus-symbol/plus-symbol.component';
import {MinusSymbolComponent} from '../../../utils/components/minus-symbol/minus-symbol.component';
import {RouterLink} from '@angular/router';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {Skill} from "../../../app/models/skill.model";
import {NgxPopperjsContentComponent, NgxPopperjsDirective, NgxPopperjsTriggers} from "ngx-popperjs";

@Component({
    selector: 'app-skill-item',
    templateUrl: './skill-item.component.html',
    styleUrls: ['./skill-item.component.scss'],
    standalone: true,
    imports: [SpacerComponent, RouterLink, MinusSymbolComponent, PlusSymbolComponent, IdToDataPipe, NgxPopperjsContentComponent, NgxPopperjsDirective]
})
export class SkillItemComponent {

    @Input() skill!: { skill: Skill, level: number };
    @Input() baseLevel!: number;
    @Output() changeValue = new EventEmitter<number>();

    constructor(protected dataService: DataService) {
    }

    protected readonly NgxPopperjsTriggers = NgxPopperjsTriggers;
}
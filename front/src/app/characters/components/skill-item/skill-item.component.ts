import {Component, EventEmitter, Input, Output} from '@angular/core';
import Skill from "../../../app/models/skill.model";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from '../../../utils/pipes/id-to-data.pipe';
import {PlusSymbolComponent} from '../../../utils/components/plus-symbol/plus-symbol.component';
import {MinusSymbolComponent} from '../../../utils/components/minus-symbol/minus-symbol.component';
import {TooltipDirective} from '../../../utils/directives/tooltip.directive';
import {RouterLink} from '@angular/router';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';

@Component({
    selector: 'app-skill-item',
    templateUrl: './skill-item.component.html',
    styleUrls: ['./skill-item.component.scss'],
    standalone: true,
    imports: [SpacerComponent, RouterLink, TooltipDirective, MinusSymbolComponent, PlusSymbolComponent, IdToDataPipe]
})
export class SkillItemComponent {

    @Input() skill!: { skill: Skill, level: number };
    @Input() baseLevel!: number;
    @Output() changeValue = new EventEmitter<number>();

    constructor(protected dataService: DataService) {
    }
}
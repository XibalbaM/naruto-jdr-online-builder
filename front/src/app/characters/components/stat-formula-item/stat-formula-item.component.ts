import {Component, Input} from '@angular/core';
import {NgxPopperjsContentComponent, NgxPopperjsDirective, NgxPopperjsTriggers} from "ngx-popperjs";
import {FormulaItem} from "../stat-formula/stat-formula.component";

@Component({
  selector: 'app-stat-formula-item',
  standalone: true,
    imports: [NgxPopperjsContentComponent, NgxPopperjsDirective],
  templateUrl: './stat-formula-item.component.html',
  styleUrl: './stat-formula-item.component.scss'
})
export class StatFormulaItemComponent {

    @Input() data!: FormulaItem;
    protected readonly NgxPopperjsTriggers = NgxPopperjsTriggers;
}
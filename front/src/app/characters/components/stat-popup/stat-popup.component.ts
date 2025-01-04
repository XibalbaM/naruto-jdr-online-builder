import {Component, input, Input, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../utils/components/modal/modal.component";
import {Formula, StatFormulaComponent} from "../stat-formula/stat-formula.component";

@Component({
  selector: 'app-stat-popup',
  standalone: true,
    imports: [
        ModalComponent,
        StatFormulaComponent
    ],
  templateUrl: './stat-popup.component.html',
  styleUrl: './stat-popup.component.scss'
})
export class StatPopupComponent {

    formula = input.required<Formula>();

    @ViewChild(ModalComponent) modal!: ModalComponent;

    show() {
        this.modal.dialog.show();
    }
}

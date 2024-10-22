import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-toggle',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        NgOptimizedImage
    ],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
export class ToggleComponent {

    @Input() value = false;
    @Output() valueChange = new EventEmitter<boolean>();

    toggle() {
        this.value = !this.value;
        this.valueChange.emit(this.value);
    }
}

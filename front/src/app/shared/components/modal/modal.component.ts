import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    @Input() mtitle!: string;
    @Input() mtext!: string;
    @Output() close = new EventEmitter<void>();
}
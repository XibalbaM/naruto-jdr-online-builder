import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    @Input() mtitle!: string;
    @Input() mtext!: string;
    @Input() dialog!: HTMLDialogElement;
    @Output() close = new EventEmitter<void>();

    ngOnInit() {
        this.dialog.classList.add('z-50');
        const show = this.dialog.show;
        this.dialog.show = () => {
            const overlay = document.createElement('div');
            overlay.classList.add('z-40', 'bg-purple', 'opacity-20', 'absolute', 'top-0', 'start-0', 'w-screen', 'h-screen');
            overlay.id = 'overlay';
            overlay.addEventListener('click', () => this.close.emit());
            document.body.appendChild(overlay);
            show.call(this.dialog);
        }
        const close = this.dialog.close;
        this.dialog.close = () => {
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.remove();
            }
            close.call(this.dialog);
        }
    }
}
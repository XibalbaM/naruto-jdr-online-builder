import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-home-button',
    templateUrl: './home-button.component.html',
    styleUrls: ['./home-button.component.scss']
})
export class HomeButtonComponent {

    @Input() link!: string | string[];
    @Input() text!: string;
    @Input() disabled = false;
}

import {Component, Input} from '@angular/core';
import { ArrowRightComponent } from '../../../shared/components/arrow-right/arrow-right.component';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-home-button',
    templateUrl: './home-button.component.html',
    styleUrls: ['./home-button.component.scss'],
    standalone: true,
    imports: [NgClass, RouterLink, ArrowRightComponent]
})
export class HomeButtonComponent {

    @Input() link!: string | string[];
    @Input() text!: string;
    @Input() disabled = false;
}

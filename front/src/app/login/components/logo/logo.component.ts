import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    imports: [
        NgOptimizedImage
    ],
    standalone: true
})
export class LogoComponent {

}

import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    standalone: true
})
export class TooltipComponent implements AfterViewInit {

    text!: string;
    left!: number;
    top!: number;
    @ViewChild('tooltip') tooltip!: ElementRef<HTMLDivElement>;

    constructor() {
    }

    ngAfterViewInit(): void {
        const {left, width} = this.tooltip.nativeElement.getBoundingClientRect();
        const {innerWidth} = window;
        if (left + width > innerWidth) {
            this.tooltip.nativeElement.style.left = `${innerWidth - (width / 2) - 5}px`;
        }
        if (left < 0) {
            this.tooltip.nativeElement.style.left = (5 + (width / 2)) + 'px';
        }
    }
}
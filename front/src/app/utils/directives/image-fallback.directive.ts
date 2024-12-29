import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true
})
export class ImageFallbackDirective {

    @Input()
    appImageFallback!: string;

    constructor(private element: ElementRef) { }

    @HostListener('error')
    loadFallback() {
        let element = this.element.nativeElement as HTMLImageElement;
        element.src = this.appImageFallback;
    }
}

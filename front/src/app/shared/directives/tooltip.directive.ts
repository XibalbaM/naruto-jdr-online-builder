import {ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import {TooltipComponent} from "../components/tooltip/tooltip.component";

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnDestroy {

    @Input() tooltip!: string;
    componentRef: ComponentRef<any> | null = null;

    constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {}

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.create();
    }

    private setTooltipComponentProperties() {
        if (this.componentRef !== null) {
            this.componentRef.instance.tooltip = this.tooltip;
            const {left, right, bottom} =
                this.elementRef.nativeElement.getBoundingClientRect();
            this.componentRef.instance.left = (right - left) / 2 + left;
            this.componentRef.instance.top = bottom;
        }
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.destroy();
    }

    @HostListener('touchstart')
    onTouchStart(): void {
        this.create();
    }

    @HostListener('touchend')
    onTouchEnd(): void {
        this.destroy();
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    create(): void {
        if (this.componentRef === null) {
            this.componentRef = this.viewContainerRef.createComponent<TooltipComponent>(TooltipComponent);
            this.componentRef.instance.text = this.tooltip;
            const domElem =
                (this.componentRef.hostView as EmbeddedViewRef<any>)
                    .rootNodes[0] as HTMLElement;
            document.body.appendChild(domElem);
            this.setTooltipComponentProperties();
        }
    }

    destroy(): void {
        if (this.componentRef !== null) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MinusSymbolComponent} from './minus-symbol.component';

describe('MinusSymbolComponent', () => {
    let component: MinusSymbolComponent;
    let fixture: ComponentFixture<MinusSymbolComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MinusSymbolComponent]
        });
        fixture = TestBed.createComponent(MinusSymbolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

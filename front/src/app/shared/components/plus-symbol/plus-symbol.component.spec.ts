import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlusSymbolComponent} from './plus-symbol.component';

describe('PlusSymbolComponent', () => {
    let component: PlusSymbolComponent;
    let fixture: ComponentFixture<PlusSymbolComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PlusSymbolComponent]
        });
        fixture = TestBed.createComponent(PlusSymbolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

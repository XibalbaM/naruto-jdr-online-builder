import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArrowBottomComponent} from './arrow-bottom.component';

describe('ArrowBottomComponent', () => {
    let component: ArrowBottomComponent;
    let fixture: ComponentFixture<ArrowBottomComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ArrowBottomComponent]
        });
        fixture = TestBed.createComponent(ArrowBottomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

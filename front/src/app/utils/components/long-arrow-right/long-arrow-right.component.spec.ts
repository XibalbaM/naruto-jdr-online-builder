import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LongArrowRightComponent} from './long-arrow-right.component';

describe('LongArrowRightComponent', () => {
    let component: LongArrowRightComponent;
    let fixture: ComponentFixture<LongArrowRightComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LongArrowRightComponent]
        });
        fixture = TestBed.createComponent(LongArrowRightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

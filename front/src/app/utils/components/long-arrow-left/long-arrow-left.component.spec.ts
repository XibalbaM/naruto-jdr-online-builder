import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LongArrowLeftComponent} from './long-arrow-left.component';

describe('LongArrowLeftComponent', () => {
    let component: LongArrowLeftComponent;
    let fixture: ComponentFixture<LongArrowLeftComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LongArrowLeftComponent]
        });
        fixture = TestBed.createComponent(LongArrowLeftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

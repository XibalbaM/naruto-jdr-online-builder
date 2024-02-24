import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SetChakraSpeComponent} from './set-chakra-spe.component';

describe('SetChrakraSpeComponent', () => {
    let component: SetChakraSpeComponent;
    let fixture: ComponentFixture<SetChakraSpeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [SetChakraSpeComponent]
});
        fixture = TestBed.createComponent(SetChakraSpeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

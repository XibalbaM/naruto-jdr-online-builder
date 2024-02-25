import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlusLogoComponent} from './plus-logo.component';

describe('PlusLogoComponent', () => {
    let component: PlusLogoComponent;
    let fixture: ComponentFixture<PlusLogoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PlusLogoComponent]
        });
        fixture = TestBed.createComponent(PlusLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PredrawnComponent} from './predrawn.component';

describe('PredrawnComponent', () => {
    let component: PredrawnComponent;
    let fixture: ComponentFixture<PredrawnComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PredrawnComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PredrawnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

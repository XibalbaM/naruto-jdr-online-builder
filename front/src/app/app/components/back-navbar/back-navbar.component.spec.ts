import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackNavbarComponent} from './back-navbar.component';

describe('BasicNavbarComponent', () => {
    let component: BackNavbarComponent;
    let fixture: ComponentFixture<BackNavbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BackNavbarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BackNavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

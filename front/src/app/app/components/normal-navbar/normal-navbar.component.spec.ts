import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NormalNavbarComponent} from './normal-navbar.component';

describe('NavComponent', () => {
    let component: NormalNavbarComponent;
    let fixture: ComponentFixture<NormalNavbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [NormalNavbarComponent]
})
            .compileComponents();

        fixture = TestBed.createComponent(NormalNavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

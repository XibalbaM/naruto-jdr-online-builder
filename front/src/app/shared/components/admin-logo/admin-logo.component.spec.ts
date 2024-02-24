import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminLogoComponent} from './admin-logo.component';

describe('AdminLogoComponent', () => {
    let component: AdminLogoComponent;
    let fixture: ComponentFixture<AdminLogoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [AdminLogoComponent]
});
        fixture = TestBed.createComponent(AdminLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

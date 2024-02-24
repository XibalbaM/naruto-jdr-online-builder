import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CharactersLogoComponent} from './characters-logo.component';

describe('CharactersLogoComponent', () => {
    let component: CharactersLogoComponent;
    let fixture: ComponentFixture<CharactersLogoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [CharactersLogoComponent]
});
        fixture = TestBed.createComponent(CharactersLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

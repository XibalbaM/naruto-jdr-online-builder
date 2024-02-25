import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterListPreviewComponent} from './character-list-preview.component';

describe('CharacterListPreviewComponent', () => {
    let component: CharacterListPreviewComponent;
    let fixture: ComponentFixture<CharacterListPreviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CharacterListPreviewComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CharacterListPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

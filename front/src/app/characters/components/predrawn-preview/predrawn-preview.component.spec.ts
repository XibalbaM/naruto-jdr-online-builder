import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PredrawnPreviewComponent} from './predrawn-preview.component';

describe('PredrawnPreviewComponent', () => {
    let component: PredrawnPreviewComponent;
    let fixture: ComponentFixture<PredrawnPreviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PredrawnPreviewComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PredrawnPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

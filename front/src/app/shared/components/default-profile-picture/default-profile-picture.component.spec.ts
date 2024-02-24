import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultProfilePictureComponent} from './default-profile-picture.component';

describe('DefaultProfilePictureComponent', () => {
    let component: DefaultProfilePictureComponent;
    let fixture: ComponentFixture<DefaultProfilePictureComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DefaultProfilePictureComponent]
        });
        fixture = TestBed.createComponent(DefaultProfilePictureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

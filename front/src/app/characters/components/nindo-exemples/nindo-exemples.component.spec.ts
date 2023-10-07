import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NindoExemplesComponent} from './nindo-exemples.component';

describe('NindoExemplesComponent', () => {
    let component: NindoExemplesComponent;
    let fixture: ComponentFixture<NindoExemplesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NindoExemplesComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NindoExemplesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

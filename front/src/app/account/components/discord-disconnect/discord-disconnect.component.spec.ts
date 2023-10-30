import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiscordDisconnectComponent} from './discord-disconnect.component';

describe('DiscordDisconnectComponent', () => {
    let component: DiscordDisconnectComponent;
    let fixture: ComponentFixture<DiscordDisconnectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DiscordDisconnectComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DiscordDisconnectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

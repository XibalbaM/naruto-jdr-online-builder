import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterNavbarComponent } from './character-navbar.component';

describe('AdvancedNavbarComponent', () => {
  let component: CharacterNavbarComponent;
  let fixture: ComponentFixture<CharacterNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

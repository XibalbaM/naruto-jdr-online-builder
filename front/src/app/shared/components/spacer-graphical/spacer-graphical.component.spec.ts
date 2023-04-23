import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacerGraphicalComponent } from './spacer-graphical.component';

describe('SpacerComponent', () => {
  let component: SpacerGraphicalComponent;
  let fixture: ComponentFixture<SpacerGraphicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacerGraphicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacerGraphicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

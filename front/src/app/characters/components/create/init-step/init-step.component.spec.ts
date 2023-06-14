import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitStepComponent } from './init-step.component';

describe('InitStepComponent', () => {
  let component: InitStepComponent;
  let fixture: ComponentFixture<InitStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

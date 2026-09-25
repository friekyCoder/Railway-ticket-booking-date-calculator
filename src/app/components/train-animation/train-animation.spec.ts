import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainAnimation } from './train-animation';

describe('TrainAnimation', () => {
  let component: TrainAnimation;
  let fixture: ComponentFixture<TrainAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainAnimation],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainAnimation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

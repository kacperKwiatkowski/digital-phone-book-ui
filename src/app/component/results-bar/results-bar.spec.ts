import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsBar } from './results-bar';

describe('ResultsBar', () => {
  let component: ResultsBar;
  let fixture: ComponentFixture<ResultsBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

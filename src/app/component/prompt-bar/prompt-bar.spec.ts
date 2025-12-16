import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptBar } from './prompt-bar';

describe('PromptBar', () => {
  let component: PromptBar;
  let fixture: ComponentFixture<PromptBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordCard } from './record-card';

describe('RecordCard', () => {
  let component: RecordCard;
  let fixture: ComponentFixture<RecordCard>;

  const NAME = 'Joanna';
  const NUMBER = '111111111';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // then
    expect(component).toBeTruthy();
  });

  it('should accept name and number as inputs', () => {
    // when
    component.name = NAME;
    component.number = NUMBER;

    fixture.detectChanges();

    // then
    expect(component.name).toBe(NAME);
    expect(component.number).toBe(NUMBER);
  });
});

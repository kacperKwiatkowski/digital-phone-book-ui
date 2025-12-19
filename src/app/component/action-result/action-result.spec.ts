import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionResult } from './action-result';
import RecordService from '../../service/record.service';
import { BehaviorSubject } from 'rxjs';

describe('ActionResult', () => {
  let component: ActionResult;
  let fixture: ComponentFixture<ActionResult>;

  const ACTION_SUBJECT = new BehaviorSubject<string>('initial message');

  const recordServiceMock = {
    action$: ACTION_SUBJECT.asObservable(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionResult],
      providers: [
        { provide: RecordService, useValue: recordServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionResult);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // then
    expect(component).toBeTruthy();
  });

  it('should assign actionMessage$ from RecordService on init', () => {
    // when
    component.ngOnInit();

    // then
    expect(component.actionMessage$).toBeDefined();
  });

  it('should emit action messages from RecordService', () => {
    // given
    component.ngOnInit();

    let received: string | null = null;
    component.actionMessage$.subscribe(value => {
      received = value;
    });

    // when
    ACTION_SUBJECT.next('Record added');

    // then
    expect(received).toBe('Record added');
  });
});

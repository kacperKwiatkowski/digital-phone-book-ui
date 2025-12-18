import {BehaviorSubject, of} from 'rxjs';
import {RecordDto} from '../../model/RecordDto';
import {ResultsBar} from './results-bar';
import {TestBed} from '@angular/core/testing';
import RecordService from '../../service/record.service';

describe('ResultsBar', () => {
  const REFRESH_SUBJECT = new BehaviorSubject<void>(undefined);
  const ENTRIES: RecordDto[] = [{ name: 'John', number: '123' } as RecordDto];

  let component: ResultsBar;

  beforeEach(async () => {
    const recordServiceMock = {
      refresh$: REFRESH_SUBJECT.asObservable(),
      getAllEntries: () => of(ENTRIES),
    };

    await TestBed.configureTestingModule({
      imports: [ResultsBar],
      providers: [
        { provide: RecordService, useValue: recordServiceMock },
      ],
    }).compileComponents();

    component = TestBed.createComponent(ResultsBar).componentInstance;
  });

  it('should load entries when refresh emits', () => {
    component.ngOnInit();

    let result: RecordDto[] | undefined;
    component.record$.subscribe(r => (result = r));

    REFRESH_SUBJECT.next();

    expect(result).toEqual(ENTRIES);
  });
});

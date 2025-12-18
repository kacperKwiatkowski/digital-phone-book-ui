import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import RecordService from './record.service';
import { RecordDto } from '../model/RecordDto';
import { PromptResponse } from '../model/PromptResponse';

describe('RecordService', () => {
  let service: RecordService;
  let httpMock: HttpTestingController;

  const SERVER_URL = 'http://localhost:8080/api/v.1.0/record';
  const GET_ALL_SUFFIX = '/all';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecordService],
    });

    service = TestBed.inject(RecordService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('postPrompt', () => {
    it('should POST prompt to server', () => {
      // given
      const inputText = 'test prompt';

      // when
      service.postPrompt(inputText).subscribe();

      // then
      const req = httpMock.expectOne(RecordServiceSpec.SERVER_URL);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ prompt: inputText });
      req.flush({});
    });
  });

  describe('getAllEntries', () => {
    it('should GET all entries', () => {
      // given
      const entries: RecordDto[] = [
        { name: 'John', number: '123' } as RecordDto,
      ];

      // when
      let result: RecordDto[] | undefined;
      service.getAllEntries().subscribe(res => (result = res));

      // then
      const req = httpMock.expectOne(
        RecordServiceSpec.SERVER_URL + RecordServiceSpec.GET_ALL_SUFFIX
      );
      expect(req.request.method).toBe('GET');
      req.flush(entries);

      expect(result).toEqual(entries);
    });

    it('should propagate error when GET fails', () => {
      // given
      const errorMessage = 'Server error';

      // when
      let error: any;
      service.getAllEntries().subscribe({
        error: err => (error = err),
      });

      // then
      const req = httpMock.expectOne(
        RecordServiceSpec.SERVER_URL + RecordServiceSpec.GET_ALL_SUFFIX
      );
      req.flush(errorMessage, { status: 500, statusText: 'Error' });

      expect(error).toBeTruthy();
    });
  });

  describe('refresh$', () => {
    it('should emit when notifyRefresh is called', () => {
      // given
      let emitted = false;
      service.refresh$.subscribe(() => (emitted = true));

      // when
      service.notifyRefresh();

      // then
      expect(emitted).toBe(true);
    });
  });

  describe('action$', () => {
    it('should emit CREATE message', () => {
      // given
      const response = createPromptResponse('CREATE');
      let message!: string;

      service.action$.subscribe(msg => (message = msg));

      // when
      service.pushAction(response);

      // then
      expect(message).toBe('Record added: John 123');
    });

    it('should emit READ message', () => {
      const response = createPromptResponse('READ');
      let message!: string;

      service.action$.subscribe(msg => (message = msg));

      service.pushAction(response);

      expect(message).toBe('Record found: John 123');
    });

    it('should emit UPDATE message', () => {
      const response = createPromptResponse('UPDATE');
      let message!: string;

      service.action$.subscribe(msg => (message = msg));

      service.pushAction(response);

      expect(message).toBe('Record updated: John 123');
    });

    it('should emit DELETE message', () => {
      const response = createPromptResponse('DELETE');
      let message!: string;

      service.action$.subscribe(msg => (message = msg));

      service.pushAction(response);

      expect(message).toBe('Record deleted: John 123');
    });

    it('should emit ERROR message', () => {
      // given
      const response: PromptResponse = {
        operation: 'ERROR',
        message: 'Something went wrong',
      } as PromptResponse;

      let message!: string;
      service.action$.subscribe(msg => (message = msg));

      // when
      service.pushAction(response);

      // then
      expect(message).toBe('Error message: Something went wrong');
    });
  });

  function createPromptResponse(operation: string): PromptResponse {
    return {
      operation,
      record: {
        name: 'John',
        number: '123',
      },
    } as PromptResponse;
  }
});

/**
 * Workaround to keep static constants strongly typed
 */
abstract class RecordServiceSpec {
  static readonly SERVER_URL = 'http://localhost:8080/api/v.1.0/record';
  static readonly GET_ALL_SUFFIX = '/all';
}

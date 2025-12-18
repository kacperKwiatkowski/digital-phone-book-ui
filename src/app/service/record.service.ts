import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, ReplaySubject, throwError} from 'rxjs';
import {RecordDto} from '../model/RecordDto';
import {PromptResponse} from '../model/PromptResponse';

@Injectable({
  providedIn: 'root',
})
export class RecordService {

  private SERVER_URL = 'http://localhost:8080/api/v.1.0/record';
  private GET_ALL_ENTRIES_URL_SUFFIX = '/all';

  private refreshSubject = new BehaviorSubject<void>(undefined);
  refresh$ = this.refreshSubject.asObservable();

  private actionSubject = new ReplaySubject<string>(1);
  action$ = this.actionSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  postPrompt(inputText: any): Observable<any> {
    console.log("This is phone number service posting prompt init:");
    return this.http.post(this.SERVER_URL, {
      prompt: inputText
    });
  }

  getAllEntries(): Observable<RecordDto[]> {
    console.log("Getting all entries from server");
    return this.http.get<RecordDto[]>(this.SERVER_URL + this.GET_ALL_ENTRIES_URL_SUFFIX)
      .pipe(
        catchError((err) => {
          console.log(err)
          return throwError(() => err);
        })
      )
  }

  notifyRefresh() {
    console.log("Notifying refresh subscribers");
    this.refreshSubject.next();
  }

  pushAction(promptResponse: PromptResponse) {
    console.log("Pushing action to subscribers");
    console.log(promptResponse.operation);
    console.log(promptResponse);
    switch (promptResponse.operation) {
      case "CREATE":
        this.actionSubject.next("Record added: " + promptResponse.record.name + " " + promptResponse.record.number);
        break;
      case "READ":
        this.actionSubject.next("Record found: " + promptResponse.record.name + " " + promptResponse.record.number);
        break;
      case "UPDATE":
        this.actionSubject.next("Record updated: " + promptResponse.record.name + " " + promptResponse.record.number);
        break;
      case "DELETE":
        this.actionSubject.next("Record deleted: " + promptResponse.record.name + " " + promptResponse.record.number);
        break;
      case "ERROR":
        console.error(promptResponse.message);
        this.actionSubject.next("Error message: " + promptResponse.message);
        break;
      default:
    }
  }
}

export default RecordService

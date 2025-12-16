import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhoneNumberService {

  constructor(
    private http: HttpClient
  ){}

  postPrompt(inputText: any) {
    this.http.post('/api/command', {
      prompt: inputText
    }).subscribe(response => {
      console.log(response);
    });
  }
}

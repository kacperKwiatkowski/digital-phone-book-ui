import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PhoneNumberService} from '../../service/phone-number-service';

@Component({
  selector: 'app-prompt-bar',
  imports: [
    FormsModule
  ],
  templateUrl: './prompt-bar.html',
  styleUrl: './prompt-bar.css',
})
export class PromptBar {

  constructor(
    private  phoneNumberService: PhoneNumberService,
  ) {}

  protected promptText: string = "";

  submitPrompt() {
    this.phoneNumberService.postPrompt(this.promptText);


  }
}

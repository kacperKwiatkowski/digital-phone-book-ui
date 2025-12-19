import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import RecordService from '../../service/record.service';

@Component({
  selector: 'app-prompt-bar',
  imports: [
    FormsModule
  ],
  templateUrl: './prompt-bar.html',
  styleUrl: './prompt-bar.css',
})
export class PromptBar {

  promptText: string = '';

  constructor(private recordService: RecordService) {}

  submitPrompt() {
    if (!this.promptText.trim()) return;

    this.recordService.postPrompt(this.promptText).subscribe({
      next: (response)  => {
        this.recordService.notifyRefresh();
        this.recordService.pushAction(response);
        this.promptText = '';
      },
      error: (err) => {
        this.recordService.pushAction(err.error);
      }
    });
  }
}

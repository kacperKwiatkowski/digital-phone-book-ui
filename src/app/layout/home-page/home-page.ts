import { Component } from '@angular/core';
import {PromptBar} from '../../component/prompt-bar/prompt-bar';
import {ResultsBar} from '../../component/results-bar/results-bar';
import {ActionResult} from '../../component/action-result/action-result';

@Component({
  selector: 'app-home-page',
  imports: [
    PromptBar,
    ResultsBar,
    ActionResult
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}

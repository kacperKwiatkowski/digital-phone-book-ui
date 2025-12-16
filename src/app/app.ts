import { Component, signal } from '@angular/core';
import {HomePage} from './layout/home-page/home-page';

@Component({
  selector: 'app-root',
  imports: [
    HomePage
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('digital-phone-book-ui');
}

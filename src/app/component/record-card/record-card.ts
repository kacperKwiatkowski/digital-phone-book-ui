import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-record-card',
  imports: [],
  templateUrl: './record-card.html',
  styleUrl: './record-card.css',
})
export class RecordCard {
  @Input() name!: string;
  @Input() number!: string;
}

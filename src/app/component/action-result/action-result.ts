import {Component, OnInit} from '@angular/core';
import RecordService from '../../service/record.service';
import {Observable, switchMap} from 'rxjs';
import {RecordDto} from '../../model/RecordDto';
import {AsyncPipe, NgIf} from '@angular/common';
import {RecordCard} from '../record-card/record-card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-action-result',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './action-result.html',
  styleUrl: './action-result.css',
})
export class ActionResult implements OnInit {

  actionMessage$!: Observable<string | null>;

  constructor(private recordService: RecordService) {
  }

  ngOnInit(): void {
    this.actionMessage$ = this.recordService.action$;
  }

  closeMessage() {
    console.log("closeMessage")
    this.recordService.flushAction()
  }
}

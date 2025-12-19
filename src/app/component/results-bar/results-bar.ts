import {Component, OnInit} from '@angular/core';
import {RecordDto} from '../../model/RecordDto';
import RecordService from '../../service/record.service';
import {Observable, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RecordCard} from '../record-card/record-card';

@Component({
  selector: 'app-results-bar',
  imports: [
    AsyncPipe,
    RecordCard
  ],
  templateUrl: './results-bar.html',
  styleUrl: './results-bar.css',
})
export class ResultsBar implements OnInit {

  record$!: Observable<RecordDto[]>;

  constructor(
    private recordService: RecordService,
  ) {
  }

  ngOnInit(): void {
    this.record$ = this.recordService.refresh$.pipe(
      switchMap(() => this.recordService.getAllEntries())
    );
  }
}

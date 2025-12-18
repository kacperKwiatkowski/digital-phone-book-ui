import {RecordDto} from './RecordDto';

export class PromptResponse {
  record: RecordDto;
  operation: string;
  message: string;

  constructor(record: RecordDto, operation: string, message: string) {
    this.record = record;
    this.operation = operation;
    this.message = message;
  }
}

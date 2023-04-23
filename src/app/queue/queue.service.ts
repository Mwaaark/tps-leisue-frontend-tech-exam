import { Injectable } from '@angular/core';
import { Queue } from './queue';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  queues: Queue[] = [];

  constructor() {}

  getLastQueueNumber() {
    return this.queues[this.queues.length - 1]?.queueNumber || '1';
  }

  addNewQueue(queue: any) {
    this.queues.push(queue);
  }
}

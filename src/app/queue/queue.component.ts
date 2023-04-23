import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddQueueComponent } from './components/add-queue/add-queue.component';
import { QueueService } from './queue.service';
import { Queue } from './queue';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit, OnDestroy {
  queues: Queue[] = [];

  searchTerm = '';
  isAutoServe = false;

  constructor(
    private queueService: QueueService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.queues = this.queueService.queues;
  }

  ngOnDestroy(): void {}

  get onGoingQueues() {
    return this.queues.filter((q) => !q.isServed && q.queueStatus === 1);
  }

  get currentServing() {
    const foundQueue = this.queues.find(
      (q) => q.isServed && q.queueStatus === 1
    );
    return foundQueue || null;
  }

  getPersonCountText(peopleCount: number = 1) {
    if (peopleCount >= 2) {
      return `${peopleCount} people`;
    }

    return '1 person';
  }

  getQueueType(queueType: number) {
    if (queueType === 1) {
      return 'Walk-in / Prio';
    } else if (queueType === 2) {
      return 'Walk-in';
    } else {
      return 'Online';
    }
  }

  nextQueueNumberToServe() {
    if (!this.queues.length) {
      return null;
    }

    const foundQueueIndex = this.queues.findIndex(
      (q) => !q.isServed && q.queueStatus === 1
    );

    return this.queues[foundQueueIndex]?.queueNumber;
  }

  setCurrentServingDone(queueNumber: string) {
    const foundIndex = this.queues.findIndex(
      (q) => q.queueNumber === queueNumber
    );

    if (foundIndex < 0) {
      return;
    }

    this.queues[foundIndex].queueStatus = 2;

    if (!this.onGoingQueues.length) {
      return;
    }
  }

  serveSelectedQueue(queueNumber: string) {
    const foundIndex = this.queues.findIndex(
      (q) => q.queueNumber === queueNumber
    );

    if (!this.onGoingQueues.length) {
      return;
    }

    this.queues[foundIndex].isServed = true;
    this.queues[foundIndex].timeQueued = new Date();
  }

  openFullscreen() {
    this.modalService.open(AddQueueComponent, { fullscreen: true });
  }
}

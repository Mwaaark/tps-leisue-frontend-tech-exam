import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddQueueComponent } from './add-queue/add-queue.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchTerm = '';
  isAutoServe = false;
  queues = [
    {
      queueNumber: 'A003',
      customerInfo: {
        name: 'Mark Robert Bumatay',
        phoneNumber: '(+63) 938-811-0269',
        people: 3,
      },
      // 1 = Walk-in / Prio
      // 2 = Walk-in
      // 3 = Online
      queueType: 3,
      timeQueued: new Date().toISOString(),
      timeServed: new Date().toISOString(),
      isServed: true,
      // 1 = Pending
      // 2 = Done
      queueStatus: 2,
    },
    {
      queueNumber: 'A004',
      customerInfo: {
        name: 'William Olarte',
        phoneNumber: '(+63) 917-198-2903',
        people: 3,
      },
      // 1 = Walk-in / Prio
      // 2 = Walk-in
      // 3 = Online
      queueType: 2,
      timeQueued: new Date().toISOString(),
      timeServed: new Date().toISOString(),
      isServed: true,
      // 1 = Pending
      // 2 = Done
      queueStatus: 1,
    },
    {
      queueNumber: 'A013',
      customerInfo: {
        name: 'John Esteban',
        phoneNumber: '(+63) 910-238-6478',
        people: 2,
      },
      // 1 = Walk-in / Prio
      // 2 = Walk-in
      // 3 = Online
      queueType: 1,
      timeQueued: new Date().toISOString(),
      timeServed: new Date().toISOString(),
      isServed: false,
      // 1 = Pending
      // 2 = Done
      queueStatus: 1,
    },
    {
      queueNumber: 'A014',
      customerInfo: {
        name: 'Marina Murillo',
        phoneNumber: '(+63) 910-238-6478',
        people: 2,
      },
      // 1 = Walk-in / Prio
      // 2 = Walk-in
      // 3 = Online
      queueType: 1,
      timeQueued: new Date().toISOString(),
      timeServed: new Date().toISOString(),
      isServed: false,
      // 1 = Pending
      // 2 = Done
      queueStatus: 1,
    },
    {
      queueNumber: 'A015',
      customerInfo: {
        name: 'Olivia Arribas',
        phoneNumber: '(+63) 910-238-6478',
        people: 2,
      },
      // 1 = Walk-in / Prio
      // 2 = Walk-in
      // 3 = Online
      queueType: 1,
      timeQueued: new Date().toISOString(),
      timeServed: new Date().toISOString(),
      isServed: false,
      // 1 = Pending
      // 2 = Done
      queueStatus: 1,
    },
    {
      queueNumber: 'A016',
      customerInfo: {
        name: 'Jose Bravo',
        phoneNumber: '(+63) 910-238-6478',
        people: 2,
      },
      // 1 = Walk-in / Prio
      // 2 = Walk-in
      // 3 = Online
      queueType: 1,
      timeQueued: new Date().toISOString(),
      isServed: false,
      // 1 = Pending
      // 2 = Done
      queueStatus: 1,
    },
    {
      queueNumber: 'A017',
      customerInfo: {
        name: 'Than Lucero',
        phoneNumber: '(+63) 910-238-6478',
        people: 2,
      },
      // 1 = Walk-in / Prio
      // 2 = Walk-in
      // 3 = Online
      queueType: 1,
      timeQueued: new Date().toISOString(),
      isServed: false,
      // 1 = Pending
      // 2 = Done
      queueStatus: 1,
    },
  ];

  constructor(private modalService: NgbModal) {}

  openFullscreen() {
    this.modalService.open(AddQueueComponent, { fullscreen: true });
  }

  get onGoingQueues() {
    return this.queues.filter((q) => !q.isServed && q.queueStatus === 1);
  }

  get currentServing() {
    const foundQueue = this.queues.find(
      (q) => q.isServed && q.queueStatus === 1
    );
    return foundQueue || null;
  }

  get nextQueueToServeIndex() {
    const foundQueueIndex = this.queues.findIndex(
      (q) => q.isServed && q.queueStatus === 1
    );
    if (foundQueueIndex < 0) {
      return null;
    }

    return foundQueueIndex + 1;
  }

  getPersonCountText(peopleCount: number) {
    if (peopleCount >= 2) {
      return `${peopleCount} people`;
    }

    return '1 person';
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

    if (this.isAutoServe) {
      this.queues[foundIndex + 1].isServed = true;
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
  }
}

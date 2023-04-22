import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-queue',
  templateUrl: './add-queue.component.html',
  styleUrls: ['./add-queue.component.scss'],
})
export class AddQueueComponent {
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  newQueueForm = this.fb.group({
    queueNumber: [''],
    name: [''],
    phoneNumber: [''],
    peopleCount: [1],
    // 1 = Walk-in / Prio
    // 2 = Walk-in
    // 3 = Online
    queueType: [false],
    timeQueued: [new Date().toISOString()],
    timeServed: [null],
    isServed: [false],
    // 1 = Pending
    // 2 = Done
    queueStatus: [1],
  });

  // form getter
  get f() {
    return this.newQueueForm;
  }

  addNewQueue() {
    console.log(this.f.value);
  }

  incrementPeopleCount() {
    if (this.f.value.peopleCount && this.f.value.peopleCount < 100) {
      this.f.patchValue({
        peopleCount: this.f.value.peopleCount + 1,
      });
    }
  }

  decrementPeopleCount() {
    if (this.f.value.peopleCount && this.f.value.peopleCount >= 2) {
      this.f.patchValue({
        peopleCount: this.f.value.peopleCount - 1,
      });
    }
  }
}

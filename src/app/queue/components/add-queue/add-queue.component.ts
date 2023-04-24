import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QueueService } from '../../queue.service';
import { Queue } from '../../queue';

@Component({
  selector: 'app-add-queue',
  templateUrl: './add-queue.component.html',
  styleUrls: ['./add-queue.component.scss'],
})
export class AddQueueComponent implements OnInit {
  queues: Queue[] = [];
  lastQueueNumber = '';

  constructor(
    private queueService: QueueService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.queues = this.queueService.queues;
    this.lastQueueNumber = this.queueService.getLastQueueNumber();
  }

  newQueueForm = this.fb.group({
    name: [''],
    phoneNumber: ['', [Validators.required, Validators.minLength(13)]],
    peopleCount: [1],
    // 1 = Walk-in / Prio
    // 2 = Walk-in
    // 3 = Online
    queueType: [false],
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
    let nextQueueNumber = null;
    const getGeneratedQueueNumber = this.generateNextQueueNumber(
      this.lastQueueNumber
    );

    if (!this.queues.length) {
      nextQueueNumber = 'A001';
    } else {
      nextQueueNumber = getGeneratedQueueNumber;
    }

    const {
      name,
      phoneNumber,
      peopleCount,
      queueType,
      timeServed,
      isServed,
      queueStatus,
    } = this.f.value;

    const queue = {
      queueNumber: nextQueueNumber,
      customerInfo: {
        name,
        phoneNumber,
        peopleCount,
      },
      queueType: queueType ? 1 : 2,
      timeQueued: new Date(),
      timeServed,
      isServed,
      queueStatus,
    };

    if (!this.f.valid) {
      alert('Please provide a valid mobile number.');
      this.f.markAllAsTouched();
      return;
    }

    this.queueService.addNewQueue(queue);

    this.activeModal.close();
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

  generateNextQueueNumber(startValue = 'A0001') {
    let currentLetter = startValue[0]; // Extract the letter from the startValue
    let currentNum = Number(startValue.slice(1)) + 1; // Extract the numeric part and convert it to a number
    return this.helper(currentLetter, currentNum);
  }

  helper(currentLetter: string, currentNum: number) {
    const result = `${currentLetter}${currentNum.toString().padStart(3, '0')}`; // Concatenate the letter with the padded numeric part
    if (currentNum === 999) {
      if (currentLetter === 'Z') {
        currentLetter = 'A'; // Reset the letter to 'A' when it reaches 'Z'
      } else {
        currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1); // Increment the letter to the next ASCII value
      }
      currentNum = 1; // Reset the number to 1 when it reaches 999
    } else {
      currentNum++; // Increment the number
    }
    return result;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQueueComponent } from './components/add-queue/add-queue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QueueComponent } from './queue.component';
import { QueueRoutingModule } from './queue-routing.module';

@NgModule({
  declarations: [QueueComponent, AddQueueComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    QueueRoutingModule,

    NgbModule,
    NgbDropdownModule,
    Ng2SearchPipeModule,
  ],
})
export class QueueModule {}

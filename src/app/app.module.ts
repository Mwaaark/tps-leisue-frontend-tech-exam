import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QueueModule } from './queue/queue.module';
import { FormsModule } from '@angular/forms';
import { QueueRoutingModule } from './queue/queue-routing.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QueueRoutingModule,
    FormsModule,
    QueueModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

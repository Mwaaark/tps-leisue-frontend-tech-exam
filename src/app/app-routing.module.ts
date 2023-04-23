import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/queues', pathMatch: 'full' },
  {
    path: 'queues',
    loadChildren: () =>
      import('./queue/queue.module').then((m) => m.QueueModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

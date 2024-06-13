import { Component } from '@angular/core';
import { JobStatusListComponent } from '../job-status-list/job-status-list.component';

@Component({
  selector: 'job-status',
  standalone: true,
  imports: [JobStatusListComponent],
  templateUrl: './job-status.component.html',
  styleUrl: './job-status.component.css'
})
export class JobStatusComponent {

}

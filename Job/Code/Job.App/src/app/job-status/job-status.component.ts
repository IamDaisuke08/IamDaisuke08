import { Component, OnInit } from '@angular/core';
import { JobStatusListComponent } from '../job-status-list/job-status-list.component';
import { FilterComponent } from '../filter/filter.component';
import { JobstatusService } from '../../shared/services/jobstatus.service';
import { JobStatusItem } from '../../shared/models/jobStatusItem';

@Component({
  selector: 'job-status',
  standalone: true,
  imports: [JobStatusListComponent, FilterComponent],
  templateUrl: './job-status.component.html',
  styleUrl: './job-status.component.css'
})
export class JobStatusComponent implements OnInit {

  mainCollection : JobStatusItem[] = [];

  constructor(private service : JobstatusService) { 
  }

  ngOnInit(): void {
    this.loadStatus();
  }
  
  loadStatus()
  {
    this.service.getStatus().subscribe((status : any) => {
      console.log('status loaded');
      this.mainCollection = status;
    },
    (error : any) => {
      alert(error.message);
    });
  }

  addNew() {
    let newStatus = new JobStatusItem(0, "", new Date());
    newStatus.onEditMode = true;
    this.mainCollection.unshift(newStatus);
  }
}

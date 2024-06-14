import { Component, OnInit } from '@angular/core';
import { JobStatusListComponent } from '../job-status-list/job-status-list.component';
import { JobstatusService } from '../../shared/services/jobstatus.service';
import { JobStatusItem } from '../../shared/models/jobStatusItem';
import { GenericHttpService } from '../../shared/services/generic-http.service';

@Component({
  selector: 'job-status',
  standalone: true,
  imports: [JobStatusListComponent],
  templateUrl: './job-status.component.html',
  styleUrl: './job-status.component.css'
})
export class JobStatusComponent implements OnInit {

  mainCollection : JobStatusItem[] = [];

  constructor(private service : GenericHttpService<JobStatusItem>) { 
    this.service.Path = "JobStatus";
  }

  ngOnInit(): void {
    this.load();
  }
  
  private load()
  {
    this.service.get().subscribe((collection : any) => {
      console.log('status loaded');
      this.mainCollection = collection;
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

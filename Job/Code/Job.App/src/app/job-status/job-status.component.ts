import { Component, OnInit } from '@angular/core';
import { JobStatusListComponent } from '@app/job-status-list/job-status-list.component';
import { JobStatusItem } from '@models/jobStatusItem';
import { GenericHttpService } from '@services/generic-http.service';

@Component({
  selector: 'job-status',
  standalone: true,
  imports: [JobStatusListComponent],
  templateUrl: './job-status.component.html',
  styleUrl: './job-status.component.css'
})
export class JobStatusComponent implements OnInit {

  path = "JobStatus";

  mainCollection : JobStatusItem[] = [];

  constructor(private service : GenericHttpService<JobStatusItem>) { 
  }

  ngOnInit(): void {
    this.load();
  }
  
  private load()
  {
    this.service.get(this.path).subscribe((collection : any) => {
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

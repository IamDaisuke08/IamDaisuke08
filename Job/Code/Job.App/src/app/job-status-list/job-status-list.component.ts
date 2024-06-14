import { Component, Input, OnInit } from '@angular/core';
import { JobstatusService } from '../../shared/services/jobstatus.service';
import { JobStatusItem } from '../../shared/models/jobStatusItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericHttpService } from '../../shared/services/generic-http.service';
import { GenericCrud } from '../generic-crud';

@Component({
  selector: 'job-status-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-status-list.component.html',
  styleUrl: './job-status-list.component.css'
})
export class JobStatusListComponent extends GenericCrud<JobStatusItem> implements OnInit {
  
  constructor(override service : GenericHttpService<JobStatusItem>) { 
    super(service);
  }

  ngOnInit(): void {
    this.service.Path = "JobStatus";
  }
}




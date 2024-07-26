import { Component, OnInit } from '@angular/core';
import { JobStatusItem } from '@models/jobStatusItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericHttpService } from '@services/generic-http.service';
import { GenericCrud } from '@app/generic-crud';
import { AuthorisationService } from '@services/auth-service';

@Component({
  selector: 'job-status-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-status-list.component.html',
  styleUrl: './job-status-list.component.css'
})
export class JobStatusListComponent extends GenericCrud<JobStatusItem> implements OnInit {
  path = "JobStatus";

  constructor(override service : GenericHttpService<JobStatusItem>, override auth : AuthorisationService) { 
    super(service, auth);
  }

  ngOnInit(): void {
  }
}




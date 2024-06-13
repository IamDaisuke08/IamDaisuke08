import { Component, OnInit } from '@angular/core';
import { JobstatusService } from '../../shared/services/jobstatus.service';
import { JobStatusItem } from '../../shared/models/jobStatusItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'job-status-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-status-list.component.html',
  styleUrl: './job-status-list.component.css'
})
export class JobStatusListComponent implements OnInit {

  jobStatus : JobStatusItem[] = [];

  constructor(private service : JobstatusService) { 

  }
  ngOnInit(): void {
    this.service.getStatus().subscribe((status : any) => {
      this.jobStatus = status;
    },
    (error : any) => {
      alert(error.message);
    });
  }

  onEdit(status : JobStatusItem) {
    this.jobStatus.forEach(s => {
      s.onEditMode = false;
    });
    status.onEditMode = true;
  }

  onCancelEdit(status : JobStatusItem) {
    status.onEditMode = false;
  }

  onSave(status: JobStatusItem) {
    throw new Error('Method not implemented.');
  }

  onDelete(status: JobStatusItem) {
    throw new Error('Method not implemented.');
  }
}

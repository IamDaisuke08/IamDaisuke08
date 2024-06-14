import { Component, Input, OnInit } from '@angular/core';
import { JobstatusService } from '../../shared/services/jobstatus.service';
import { JobStatusItem } from '../../shared/models/jobStatusItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'job-status-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-status-list.component.html',
  styleUrl: './job-status-list.component.css'
})
export class JobStatusListComponent implements OnInit {
  
  @Input() jobStatus : JobStatusItem[] = [];

  constructor(private service : JobstatusService) { 
  }

  ngOnInit(): void {
  }

  onEdit(status : JobStatusItem) {
    this.jobStatus.forEach(s => {
      s.onEditMode = false;
    });
    status.onEditMode = true;
  }

  onCancelEdit(status : JobStatusItem) {
    status.onEditMode = false;
    if (status.id == 0) {
      this.jobStatus.splice(0, 1);
    }
  }

  onSave(status: JobStatusItem) {
    if (status.id == 0) {
      this.addStatus(status);
    } else {
      this.updateStatus(status);
    }
  }

  onDelete(status: JobStatusItem) {
    this.service.deleteStatus(status.id).subscribe(() => {
      console.log(`deleted jobstatus ${status.id}`);
    },
    (error : any) => {
      console.log(error.message);
    },
    () => {
      let index = this.jobStatus.indexOf(status);
      this.jobStatus.splice(index, 1);
    });
  }

  private updateStatus(status: JobStatusItem) {
    this.service.updateStatus(status).subscribe(() => {
      let log = `save successfull: ${ JSON.stringify(status) }`;
      console.log(log);
    },
    (error : any) => {
      console.log(error.message);
    },
    () => {
      status.onEditMode = false;
    });
  }

  addStatus(status: JobStatusItem) {
    this.service.addStatus(status).subscribe((newStatus : any) => {
      let log = `save successfull: ${ JSON.stringify(newStatus) }`;
      console.log(log);
      this.jobStatus.splice(0, 1);
      this.jobStatus.push(newStatus);
    },
    (error : any) => {
      console.log(error.message);
    },
    () => {
      status.onEditMode = false;
    });
  }
}




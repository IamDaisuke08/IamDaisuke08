import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenericCrud } from '@app/generic-crud';
import { ApplicationItem } from '@models/applicationItem';
import { GenericHttpService } from '@services/generic-http.service';
import { LocationItem } from '@models/locationItem';
import { JobStatusItem } from '@models/jobStatusItem';
import { Router } from '@angular/router';

@Component({
  selector: 'application-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.css'
})
export class ApplicationListComponent extends GenericCrud<ApplicationItem> implements OnInit {

  path = "JobApplications";
  @Input() locations : LocationItem[] = [];
  @Input() status : JobStatusItem[] = [];

  constructor(override service : GenericHttpService<ApplicationItem>, private router : Router) {
    super(service);
  }

  ngOnInit(): void {

  }

  saveApplication(item: ApplicationItem): void {
    super.onSave(this.path, item);
  }

  editApplication(item: ApplicationItem): void {
    this.router.navigate(["form", item.id]);
  }

  deleteApplication(item: ApplicationItem): void {
    super.onDelete(this.path, item);
  }

  getLocation(value : number) : string {
    let returnValue = "";
    let loc = this.locations.find(x => x.id == value);
    if (loc != undefined) {
      returnValue = loc.name;
    }

    return returnValue;
  }

  getStatus(value : number) : string {
    let returnValue = "";
    let stat = this.status.find(x => x.id == value);
    if (stat != undefined) {
      returnValue = stat.name;
    }
    
    return returnValue;
  }
}

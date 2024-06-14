import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenericCrud } from '../generic-crud';
import { ApplicationItem } from '../../shared/models/applicationItem';
import { GenericHttpService } from '../../shared/services/generic-http.service';
import { LocationItem } from '../../shared/models/locationItem';
import { JobStatusItem } from '../../shared/models/jobStatusItem';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'application-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.css'
})
export class ApplicationListComponent extends GenericCrud<ApplicationItem> implements OnInit {

  path = "JobApplications";
  locations : LocationItem[] = [];
  status : JobStatusItem[] = [];

  constructor(override service : GenericHttpService<ApplicationItem>) {
    super(service);
  }

  ngOnInit(): void {
    this.loadStatus();
    this.loadLocations();
  }

  saveApplication(item: ApplicationItem): void {
    super.onSave(this.path, item);
  }

  editApplication(item: ApplicationItem): void {
    console.log("edit clicked;");
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

  loadStatus() {
    this.service.get("JobStatus").subscribe((statusCollection : any) => {
      this.status = statusCollection;
    },
    (error : any) => {
      console.log(error.message);
    },
    () => {
      console.log("status loaded.")
    });
  }

  loadLocations() {
    this.service.get("Locations").subscribe((locCollection : any) => {
      this.locations = locCollection;
    },        
    (error : any) => {
      console.log(error.message);
    },
    () => {
      console.log("locations loaded.")
    });
  }
}

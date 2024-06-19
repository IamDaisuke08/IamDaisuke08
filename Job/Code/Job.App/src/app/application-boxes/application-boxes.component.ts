import { Component, Input, OnInit } from '@angular/core';
import { GenericCrud } from '../generic-crud';
import { ApplicationItem } from '../../shared/models/applicationItem';
import { LocationItem } from '../../shared/models/locationItem';
import { JobStatusItem } from '../../shared/models/jobStatusItem';
import { GenericHttpService } from '../../shared/services/generic-http.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationBoxComponent } from '../application-box/application-box.component';

@Component({
  selector: 'application-boxes',
  standalone: true,
  imports: [FormsModule, CommonModule, ApplicationBoxComponent],
  templateUrl: './application-boxes.component.html',
  styleUrl: './application-boxes.component.css'
})
export class ApplicationBoxesComponent extends GenericCrud<ApplicationItem> implements OnInit{
  path = "JobApplications";
  @Input() locations : LocationItem[] = [];
  @Input() status : JobStatusItem[] = [];
  
  constructor(override service : GenericHttpService<ApplicationItem>, private router : Router) {
    super(service);
  }
  
  ngOnInit(): void {
    
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

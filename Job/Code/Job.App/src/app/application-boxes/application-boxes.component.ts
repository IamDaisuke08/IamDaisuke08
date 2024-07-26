import { Component, Input } from '@angular/core';
import { GenericCrud } from '@app/generic-crud';
import { ApplicationItem } from '@models/applicationItem';
import { LocationItem } from '@models/locationItem';
import { JobStatusItem } from '@models/jobStatusItem';
import { GenericHttpService } from '@services/generic-http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationBoxComponent } from '@app/application-box/application-box.component';
import { AuthorisationService } from '@services/auth-service';

@Component({
  selector: 'application-boxes',
  standalone: true,
  imports: [FormsModule, CommonModule, ApplicationBoxComponent],
  templateUrl: './application-boxes.component.html',
  styleUrl: './application-boxes.component.css'
})
export class ApplicationBoxesComponent extends GenericCrud<ApplicationItem> {
  path = "JobApplications";
  @Input() locations : LocationItem[] = [];
  @Input() status : JobStatusItem[] = [];
  
  constructor(
    override service : GenericHttpService<ApplicationItem>, 
    override auth : AuthorisationService) {
    super(service, auth);
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

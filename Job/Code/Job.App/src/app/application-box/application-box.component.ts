import { Component, Input, OnInit } from '@angular/core';
import { ApplicationItem } from '@models/applicationItem';
import { JobStatusItem } from '@models/jobStatusItem';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolTipDirective } from '@app/tooltip';
import { LocationItem } from '@models/locationItem';


@Component({
  selector: 'application-box',
  standalone: true,
  imports: [RouterLink, CommonModule, ToolTipDirective],
  templateUrl: './application-box.component.html',
  styleUrl: './application-box.component.css'
})
export class ApplicationBoxComponent implements OnInit {

  @Input() item! : ApplicationItem;
  @Input() status : JobStatusItem[] = [];
  @Input() locations : LocationItem[] = [];

  imageName: string = "bg-applied.png";
  statusName : string = "";
  toolTip : string[] = [];

  ngOnInit(): void {
    let stat = this.getStatus(this.item.statusId);
    if (stat == "Rejected") {
      this.imageName = "bg-rejected.png";
    } 
    else if (stat != "Applied") {
      this.imageName = "bg-active.png";
    }

    let loc = this.getLocation(this.item.locationId)
    this.toolTip = [`Status: ${stat}\rLocation: ${loc}`];
  }

  getStatus(value : number) : string {
    let returnValue = "";
    let stat = this.status.find(x => x.id == value);
    if (stat != undefined) {
      returnValue = stat.name;
    }
    
    return returnValue;
  }

  getLocation(value : number) : string {
    let returnValue = "";
    let loc = this.locations.find(x => x.id == value);
    if (loc != undefined) {
      returnValue = loc.name;
    }

    return returnValue;
  }
}

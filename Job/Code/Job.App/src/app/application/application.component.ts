import { Component, OnInit } from '@angular/core';
import { ApplicationItem } from '@models/applicationItem';
import { GenericHttpService } from '@services/generic-http.service';
import { ApplicationListComponent } from '@app/application-list/application-list.component';
import { Router } from '@angular/router';
import { FilterComponent } from '@app/filter/filter.component';
import { LocationItem } from '@models/locationItem';
import { JobStatusItem } from '@models/jobStatusItem';
import { CommonModule } from '@angular/common';
import { ApplicationBoxesComponent } from '@app/application-boxes/application-boxes.component';

@Component({
  selector: 'application',
  standalone: true,
  imports: [ApplicationListComponent, FilterComponent, CommonModule, ApplicationBoxesComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit {

  path = "JobApplications";
  mainCollection : ApplicationItem[] = [];
  locations : LocationItem[] = [];
  status : JobStatusItem[] = [];

  filterCompany: any;
  filterLoc: any;
  filterStat: any;

  constructor(private service : GenericHttpService<ApplicationItem>, private router : Router) { 
  }

  ngOnInit(): void {
    this.loadStatus();
    this.loadLocations();
    this.load();
  }

  private load()
  {
    this.service.get(this.path).subscribe((collection : any) => {
      console.log('job applications loaded');
      this.mainCollection = collection;
    },
    (error : any) => {
      alert(error.message);
    });
  }

  loadStatus() {
    this.service.get("JobStatus").subscribe((statusCollection : any) => {
      this.status = statusCollection;
      this.status.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
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
      this.locations.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    },        
    (error : any) => {
      console.log(error.message);
    },
    () => {
      console.log("locations loaded.")
    });
  }

  filterUniqueCompanies() : { id : string, name : string} [] {
    let filtered : { id : string, name : string}[] = [];
    this.mainCollection.map(m => filtered.filter(f => f.name == m.companyName).length > 0 ? null : filtered.push({id : m.companyName, name : m.companyName}));
    return filtered.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  }

  getVisibleItems() : ApplicationItem[] {
    let visibleItems = this.mainCollection;
    if (this.filterCompany != undefined && this.filterCompany[1] != 0) {
      visibleItems = visibleItems.filter(x => x.companyName == this.filterCompany[1]);
    }

    if (this.filterLoc != undefined && this.filterLoc[1] != 0) {
      visibleItems = visibleItems.filter(x => x.locationId == this.filterLoc[1]);
    }

    if (this.filterStat != undefined && this.filterStat[1] != 0) {
      visibleItems = visibleItems.filter(x => x.statusId == this.filterStat[1]);
    }

    return visibleItems;
  }

  addNew() {
    this.router.navigate(["form", "0"]);
  }
}

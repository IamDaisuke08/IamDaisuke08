import { AfterViewInit, Component } from '@angular/core';
import { ApplicationItem } from '@models/applicationItem';
import { GenericHttpService } from '@services/generic-http.service';
import { ApplicationListComponent } from '@app/application-list/application-list.component';
import { Router } from '@angular/router';
import { FilterComponent } from '@app/filter/filter.component';
import { LocationItem } from '@models/locationItem';
import { JobStatusItem } from '@models/jobStatusItem';
import { CommonModule } from '@angular/common';
import { ApplicationBoxesComponent } from '@app/application-boxes/application-boxes.component';
import { DummyService } from '@services/dummy-service';
import { finalize } from 'rxjs';
import { AuthorisationService } from '@services/auth-service';
import { LoadingComponent } from '@app/loading/loading.component';

@Component({
  selector: 'application',
  standalone: true,
  imports: [ApplicationListComponent, FilterComponent, CommonModule, ApplicationBoxesComponent, LoadingComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements AfterViewInit {

  path = "JobApplications";
  mainCollection : ApplicationItem[] = [];
  locations : LocationItem[] = [];
  status : JobStatusItem[] = [];

  filterCompany: any;
  filterLoc: any;
  filterStat: any;
  loaded = false;

  /**************************************************************************************************************
   * disabling declarative implmenentation, does not fit the 'offline' mode objects

  jobApps$ = this.service.get(this.path).pipe(
    catchError(() => of(this.dummy.getApplications()))
  );

  filtest = new BehaviorSubject("");

  visibleJobs$ = this.filtest.asObservable().pipe(
    switchMap(() => {
      return this.jobApps$.pipe(
        map((apps) => {
          console.log('filttest', this.filtest.value);
          let filtered : any = apps;
          if (this.filtest.value !== '') {
            console.log('===============>>> filtering');
            filtered = filtered.filter((x: any)=> x.companyName == this.filtest.value); 
          }
          return filtered;
        }))
    })
  );
  ****************************************************************************************************************/

  get IsLoggedIn() {
    let logged = false;
    const auths = this.auth.user$.subscribe(user => logged = user !== null);
    auths.unsubscribe();
    return logged;
  }

  constructor(
    private service : GenericHttpService<ApplicationItem>, 
    private router : Router,
    private dummy : DummyService,
    public auth : AuthorisationService) { 
  }

  ngAfterViewInit(): void {

    this.loadStatus();
  }

  private load()
  {
    const jobGetter = this.service.get(this.path);
    jobGetter.pipe(
      finalize(() => this.loaded = true),
    )
    .subscribe({
      next: (collection : any) => {
        console.log('job applications loaded');
        this.mainCollection = collection;
      },
      error: (error : any) => { 
        this.mainCollection = this.dummy.getApplications();
        console.log(error); 
      }
    });
  }

  private loadStatus() {
    const statGetter = this.service.get('JobStatus');
    statGetter.pipe(
      finalize(() => {
        this.status.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.loadLocations();
      })
    )
    .subscribe(
      {
        next: (statusCollection : any) => {
            this.status = statusCollection;
          },
        error: (error : any) => { 
          this.status = this.dummy.getStatus();
          console.log(error.message); 
        },
        complete: () => { 
          console.log('status load complete'); 
          }
      });
  }

  private loadLocations() {
    const locGetter = this.service.get('Locations');
    locGetter.pipe(
      finalize(() => {
        this.locations.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.load();
      })
    )
    .subscribe({
      next: (locCollection : any) => {
          this.locations = locCollection;
        },        
      error: (error : any) => { 
        console.log(error.message);
        this.locations = this.dummy.getLocations();
      },
      complete: () => {
          console.log("locations loaded.");
        }
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

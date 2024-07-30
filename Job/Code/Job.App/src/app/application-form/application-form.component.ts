import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GenericHttpService } from '@services/generic-http.service';
import { ApplicationItem } from '@models/applicationItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationItem } from '@models/locationItem';
import { JobStatusItem } from '@models/jobStatusItem';
import { GenericCrud } from '@app/generic-crud';
import { finalize, Subscription } from 'rxjs';
import { DummyService } from '@services/dummy-service';
import { LoadingComponent } from '@app/loading/loading.component';

@Component({
  selector: 'application-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.css'
})
export class ApplicationFormComponent extends GenericCrud<ApplicationItem> implements OnInit, AfterViewInit, OnDestroy {

  id : number = 0;
  job! : ApplicationItem;
  path = "JobApplications";
  action : string = "";

  locations : LocationItem[] = [];
  jobStatus : JobStatusItem[] = [];
  jobSubs! : Subscription;
  statSubs! : Subscription;
  locSubs! : Subscription;

  loaded = false;

  constructor(
    override service : GenericHttpService<ApplicationItem>, 
    private route : ActivatedRoute, 
    private router : Router,
    private dummy : DummyService) {
    super(service);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.jobSubs?.unsubscribe();
    this.statSubs?.unsubscribe();
    this.locSubs?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.loadStatus();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')!;
    });
  }

  private load() : void {
    if (this.id != 0) {
      const getapp = this.service.getById(this.path, this.id);
      this.jobSubs = getapp.pipe(
        finalize(() => {
          this.action = 'Edit';
          this.loaded = true;
        })
      )
      .subscribe({
        next: (item : any) => {
          this.job = item;
          this.action = "Edit";
        },
        error: (error : any) => {
          console.log(error.message);
          this.job = this.dummy.getApplications().find(x => x.id == this.id) ?? new ApplicationItem(0, "", "", 0, 0, "", new Date());
        }
    });
    } else {
      this.job = new ApplicationItem(0, "", "", 0, 0, "", new Date());
      this.action = "Add";
      this.loaded = true;
    }
  }

  private loadStatus() : void {
    const statGetter = this.service.get('JobStatus');
    this.statSubs = statGetter.pipe(
      finalize(() => {
        this.jobStatus.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.loadLocations();
      })
    )
    .subscribe(
      {
        next: (statusCollection : any) => {
            this.jobStatus = statusCollection;
          },
        error: (error : any) => { 
          this.jobStatus = this.dummy.getStatus();
          console.log(error.message); 
        },
        complete: () => { 
          console.log('status load complete'); 
          }
      });
  }

  private loadLocations() : void {
    const locGetter = this.service.get('Locations');
    this.locSubs = locGetter.pipe(
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

  saveJob() : void {
    this.onSave(this.path, this.job);
    this.backToMain();
  }

  backToMain() {
    this.router.navigate(['application']);
      // .then(() => {
      //   window.location.reload();
      // });
  }
}

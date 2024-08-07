import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { JobStatusListComponent } from '@app/job-status-list/job-status-list.component';
import { LoadingComponent } from '@app/loading/loading.component';
import { JobStatusItem } from '@models/jobStatusItem';
import { AuthorisationService } from '@services/auth-service';
import { DummyService } from '@services/dummy-service';
import { GenericHttpService } from '@services/generic-http.service';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'job-status',
  standalone: true,
  imports: [JobStatusListComponent, LoadingComponent],
  templateUrl: './job-status.component.html',
  styleUrl: './job-status.component.css'
})
export class JobStatusComponent implements AfterViewInit, OnDestroy {

  path = "JobStatus";
  loaded = false;
  mainCollection : JobStatusItem[] = [];

  dummy = inject(DummyService);
  auth = inject(AuthorisationService);
  service = inject(GenericHttpService<JobStatusItem>);

  statSubs! : Subscription;

  get IsLoggedIn() {
    let logged = false;
    const auths = this.auth.user$.subscribe(user => logged = user !== null);
    auths.unsubscribe();
    return logged;
  }

  ngOnDestroy(): void {
    this.statSubs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.load();
  }
  
  private load()
  {
    const statGetter = this.service.get(this.path);
    this.statSubs = statGetter.pipe(
      finalize(() => this.loaded = true)
    )
    .subscribe({
      next: (collection : any) => {
        console.log('status loaded');
        this.mainCollection = collection;
      },
      error: (error : any) => {
        this.mainCollection = this.dummy.getStatus();
        console.log(error.message);
      }
    });
  }

  addNew() {
    let newStatus = new JobStatusItem(0, "", new Date());
    newStatus.onEditMode = true;
    this.mainCollection.unshift(newStatus);
  }
}

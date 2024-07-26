import { AfterViewInit, Component } from '@angular/core';
import { JobStatusListComponent } from '@app/job-status-list/job-status-list.component';
import { JobStatusItem } from '@models/jobStatusItem';
import { AuthorisationService } from '@services/auth-service';
import { DummyService } from '@services/dummy-service';
import { GenericHttpService } from '@services/generic-http.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'job-status',
  standalone: true,
  imports: [JobStatusListComponent],
  templateUrl: './job-status.component.html',
  styleUrl: './job-status.component.css'
})
export class JobStatusComponent implements AfterViewInit {

  path = "JobStatus";
  loaded = false;
  mainCollection : JobStatusItem[] = [];

  get IsLoggedIn() {
    let logged = false;
    const auths = this.auth.user$.subscribe(user => logged = user !== null);
    auths.unsubscribe();
    return logged;
  }

  constructor(
    private service : GenericHttpService<JobStatusItem>, 
    private dummy : DummyService,
    public auth : AuthorisationService) { 
  }
  ngAfterViewInit(): void {
    this.load();
  }
  
  private load()
  {
    const statGetter = this.service.get(this.path);
    statGetter.pipe(
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

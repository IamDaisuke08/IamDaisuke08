import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GenericHttpService } from '../../shared/services/generic-http.service';
import { ApplicationItem } from '../../shared/models/applicationItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationItem } from '../../shared/models/locationItem';
import { JobStatusItem } from '../../shared/models/jobStatusItem';
import { GenericCrud } from '../generic-crud';

@Component({
  selector: 'application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.css'
})
export class ApplicationFormComponent extends GenericCrud<ApplicationItem> implements OnInit {

  id : number = 0;
  job! : ApplicationItem;
  path = "JobApplications";
  action : string = "";

  locations : LocationItem[] = [];
  jobStatus : JobStatusItem[] = [];

  constructor(
    override service : GenericHttpService<ApplicationItem>, 
    private route : ActivatedRoute, 
    private router : Router) {
    super(service);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')!;
    });

    this.service.get("Locations").subscribe((locs : any) => {
      this.locations = locs;
      this.locations.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    });

    this.service.get("JobStatus").subscribe((status: any) =>{
      this.jobStatus = status;
      this.jobStatus.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    });

    if (this.id != 0) {
      this.service.getById(this.path, this.id).subscribe((item : any) => {
        this.job = item;
        this.action = "Edit";
      },
      (error : any) => {
        console.log(error.message);
      });
    } else {
      this.job = new ApplicationItem(0, "", "", 0, 0, "", new Date());
      this.action = "Add";
    }
  }

  saveJob() {
    this.onSave(this.path, this.job);
    this.backToMain();
  }

  backToMain() {
    this.router.navigate([''])
      .then(() => {
        window.location.reload();
      });
  }
}

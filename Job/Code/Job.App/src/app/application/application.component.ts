import { Component, OnInit } from '@angular/core';
import { ApplicationItem } from '../../shared/models/applicationItem';
import { GenericHttpService } from '../../shared/services/generic-http.service';
import { ApplicationListComponent } from '../application-list/application-list.component';

@Component({
  selector: 'application',
  standalone: true,
  imports: [ApplicationListComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit {

  path = "JobApplications";
  mainCollection : ApplicationItem[] = [];

  constructor(private service : GenericHttpService<ApplicationItem>) { 
  }

  ngOnInit(): void {
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

  addNew() {
    let newApplication = new ApplicationItem(0, "", "", 0, 0, "", new Date());
    newApplication.onEditMode = true;
    this.mainCollection.unshift(newApplication);
  }
}

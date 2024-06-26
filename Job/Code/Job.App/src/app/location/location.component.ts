import { Component, OnInit } from '@angular/core';
import { LocationItem } from '../../shared/models/locationItem';
import { GenericHttpService } from '../../shared/services/generic-http.service';
import { LocationListComponent } from '../location-list/location-list.component';

@Component({
  selector: 'location',
  standalone: true,
  imports: [LocationListComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {

  path = "Locations";
  mainCollection : LocationItem[] = [];

  constructor(private service : GenericHttpService<LocationItem>) { 
  }

  ngOnInit(): void {
    this.load();
  }
  
  private load()
  {
    this.service.get(this.path).subscribe((collection : any) => {
      console.log('status loaded');
      this.mainCollection = collection;
    },
    (error : any) => {
      alert(error.message);
    });
  }

  addNew() {
    let newLocation = new LocationItem(0, "", new Date());
    newLocation.onEditMode = true;
    this.mainCollection.unshift(newLocation);
  }
}

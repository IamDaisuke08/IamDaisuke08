import { Component, OnInit } from '@angular/core';
import { LocationItem } from '@models/locationItem';
import { GenericHttpService } from '@services/generic-http.service';
import { LocationListComponent } from '@app/location-list/location-list.component';
import { LocationMapListComponent } from '@app/location-map-list/location-map-list.component';

@Component({
  selector: 'location',
  standalone: true,
  imports: [LocationListComponent, LocationMapListComponent],
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

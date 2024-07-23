import { AfterViewInit, Component } from '@angular/core';
import { LocationItem } from '@models/locationItem';
import { GenericHttpService } from '@services/generic-http.service';
import { LocationListComponent } from '@app/location-list/location-list.component';
import { LocationMapListComponent } from '@app/location-map-list/location-map-list.component';
import { DummyService } from '@services/dummy-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'location',
  standalone: true,
  imports: [LocationListComponent, LocationMapListComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements AfterViewInit {

  path = "Locations";
  mainCollection : LocationItem[] = [];
  loaded = false;

  constructor(private service : GenericHttpService<LocationItem>, private dummy : DummyService) { 
  }
  ngAfterViewInit(): void {
    this.load();
  }
  
  private load()
  {
    const locGetter = this.service.get(this.path);
    locGetter.pipe(
      finalize(() => this.loaded = true)
    )
    .subscribe({
      next: (collection : any) => {
        console.log('status loaded');
        this.mainCollection = collection;
      },
    error: (error : any) => {
        this.mainCollection = this.dummy.getLocations();
        console.log(error.message);
      }
    });
  }

  addNew() {
    let newLocation = new LocationItem(0, "", new Date());
    newLocation.onEditMode = true;
    this.mainCollection.unshift(newLocation);
  }
}

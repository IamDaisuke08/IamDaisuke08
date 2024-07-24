import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenericCrud } from '@app/generic-crud';
import { LocationMapComponent } from '@app/location-map/location-map.component';
import { LocationItem } from '@models/locationItem';
import { GenericHttpService } from '@services/generic-http.service';

@Component({
  selector: 'location-map-list',
  standalone: true,
  imports: [LocationMapComponent, FormsModule],
  templateUrl: './location-map-list.component.html',
  styleUrl: './location-map-list.component.css'
})
export class LocationMapListComponent extends GenericCrud<LocationItem> implements AfterViewInit, OnInit {

  path = "Locations";
  selectedItem! : LocationItem;
  showMap = true;

  constructor(override service : GenericHttpService<LocationItem>, 
    public breakepoint : BreakpointObserver) {
    super(service);
  }

  ngOnInit(): void {
    this.breakepoint
    .observe(['(max-width: 65rem)'])
    .subscribe((state: BreakpointState) => {
      this.showMap = !state.matches;
    });
  }

  ngOnChanges() {
    if (this.selectedItem != undefined && this.selectedItem.id == -1 && this.collection.length !== 0) {
      this.setSelected(this.collection[0].id);
    }
  }

  ngAfterViewInit(): void {
    if (this.collection.length !== 0) {
      this.selectedItem = this.collection[0];
    }
    else {
      this.selectedItem = new LocationItem(-1, "", new Date());
      this.selectedItem.lat = -36.8496969;
      this.selectedItem.lng = 174.7543261;
      this.selectedItem.zoom = 11;
    }
  }

  override onEdit(item: LocationItem): void {
    this.selectedItem = item;
    this.selectedItem.onEditMode = true;
    super.onEdit(item);
  }

  setSelected(locId: number) {
    this.selectedItem = this.collection.find(x => x.id == locId)!;
    if (locId > 0) {
      this.collection.forEach(x => x.selected = false);
      this.selectedItem.selected = true;
    }
  }

  addNew() {
    if (this.collection[0].id !== 0) {
      let newLocation = new LocationItem(0, "", new Date());
      newLocation.onEditMode = true;
      this.collection.unshift(newLocation);
    }
  }
}
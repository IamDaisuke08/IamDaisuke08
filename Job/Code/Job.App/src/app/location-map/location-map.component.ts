import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LocationItem } from '@models/locationItem';

@Component({
  selector: 'location-map',
  standalone: true,
  imports: [],
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.css'
})
export class LocationMapComponent {

  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  
  @Input() locItem! : LocationItem;
  @Output() locItemChange = new EventEmitter<LocationItem>();

  @Input() editing = false;

  map! : google.maps.Map;
  mapOptions: google.maps.MapOptions = {};

  ngOnChanges() {
    this.setMap();
  }

  async setMap() {
    if (this.map == undefined) {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      this.map = new Map(this.gmap.nativeElement, this.mapOptions);
    }

    const position = { lat: this.locItem.lat, lng: this.locItem.lng };
    this.map.setCenter(position);
    this.map.setZoom(this.locItem.zoom);

    if (this.editing && this.editing == this.locItem.onEditMode) {
      this.mapOptions = {
        disableDefaultUI: false,
        draggable: true
      };

      // Create the initial InfoWindow.
      let infoWindow = new google.maps.InfoWindow({
        headerContent: this.locItem.name,
        content: 'Click the map to set position',
        position: position,
      });

      infoWindow.open(this.map);
      this.map.addListener("click", (mapsMouseEvent : any) => {
        // Close the current InfoWindow.
        let mousePos : google.maps.LatLng = mapsMouseEvent.latLng;
        infoWindow.close();
  
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
          position: mousePos,
          headerContent: this.locItem.name
        });

        let selectedLat = Math.round(mousePos.lat() * 10000000) / 10000000;
        let selectedLng = Math.round(mousePos.lng() * 10000000) / 10000000
        let selectedZm = this.map.getZoom();

        infoWindow.setContent(
          ` <strong>Lat</strong>: ${ selectedLat }<br>
            <strong>Lng</strong>: ${ selectedLng }<br>
            <strong>Zoom</strong>: ${ selectedZm }`
        );
        infoWindow.open(this.map);
  
        this.locItem.zoom = selectedZm ?? 0
        this.locItem.lat = selectedLat;
        this.locItem.lng = selectedLng;
        this.locItemChange.emit(this.locItem);
      });
    } else {
      this.mapOptions = {
        disableDefaultUI: true,
        draggable: false
      };
    }

    this.map.setOptions(this.mapOptions);   
  }
}

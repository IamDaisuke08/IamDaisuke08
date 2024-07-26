import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenericHttpService } from '@services/generic-http.service';
import { LocationItem } from '@models/locationItem';
import { GenericCrud } from '@app/generic-crud';
import { AuthorisationService } from '@services/auth-service';

@Component({
  selector: 'location-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent extends GenericCrud<LocationItem> {

  path = "Locations";

  constructor(override service : GenericHttpService<LocationItem>, override auth : AuthorisationService) {
    super(service, auth);
  }
}

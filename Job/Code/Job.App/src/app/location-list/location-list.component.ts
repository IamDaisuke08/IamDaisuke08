import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenericHttpService } from '../../shared/services/generic-http.service';
import { LocationItem } from '../../shared/models/locationItem';
import { GenericCrud } from '../generic-crud';

@Component({
  selector: 'location-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent extends GenericCrud<LocationItem> implements OnInit {

  constructor(override service : GenericHttpService<LocationItem>) {
    super(service);
  }

  ngOnInit(): void {
    this.service.Path = "Locations";
  }
}

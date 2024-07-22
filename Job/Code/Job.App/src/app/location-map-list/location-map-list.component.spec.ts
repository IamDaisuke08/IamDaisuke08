import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMapListComponent } from './location-map-list.component';

describe('LocationMapListComponent', () => {
  let component: LocationMapListComponent;
  let fixture: ComponentFixture<LocationMapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationMapListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationMapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

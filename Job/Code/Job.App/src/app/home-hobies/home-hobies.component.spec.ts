import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHobiesComponent } from './home-hobies.component';

describe('HomeHobiesComponent', () => {
  let component: HomeHobiesComponent;
  let fixture: ComponentFixture<HomeHobiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHobiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHobiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

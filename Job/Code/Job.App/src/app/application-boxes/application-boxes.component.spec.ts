import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBoxesComponent } from './application-boxes.component';

describe('ApplicationBoxesComponent', () => {
  let component: ApplicationBoxesComponent;
  let fixture: ComponentFixture<ApplicationBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationBoxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

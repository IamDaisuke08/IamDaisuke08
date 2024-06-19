import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBoxComponent } from './application-box.component';

describe('ApplicationBoxComponent', () => {
  let component: ApplicationBoxComponent;
  let fixture: ComponentFixture<ApplicationBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

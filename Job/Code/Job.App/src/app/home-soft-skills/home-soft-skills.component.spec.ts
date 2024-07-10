import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSoftSkillsComponent } from './home-soft-skills.component';

describe('HomeSoftSkillsComponent', () => {
  let component: HomeSoftSkillsComponent;
  let fixture: ComponentFixture<HomeSoftSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSoftSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSoftSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

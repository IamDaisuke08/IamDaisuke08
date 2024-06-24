import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSkillListComponent } from './home-skill-list.component';

describe('HomeSkillListComponent', () => {
  let component: HomeSkillListComponent;
  let fixture: ComponentFixture<HomeSkillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSkillListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSkillItemComponent } from './home-skill-item.component';

describe('HomeSkillItemComponent', () => {
  let component: HomeSkillItemComponent;
  let fixture: ComponentFixture<HomeSkillItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSkillItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSkillItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

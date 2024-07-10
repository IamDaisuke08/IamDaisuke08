import { Component } from '@angular/core';
import { HomeHeroComponent } from '../home-hero/home-hero.component';
import { HomeSkillListComponent } from '../home-skill-list/home-skill-list.component';
import { HomeSoftSkillsComponent } from '../home-soft-skills/home-soft-skills.component';
import { HomeHobiesComponent } from '../home-hobies/home-hobies.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [HomeHeroComponent, HomeSkillListComponent, HomeSoftSkillsComponent, HomeHobiesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

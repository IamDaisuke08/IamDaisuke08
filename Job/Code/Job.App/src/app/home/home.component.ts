import { Component } from '@angular/core';
import { HomeHeroComponent } from '@app/home-hero/home-hero.component';
import { HomeSkillListComponent } from '@app/home-skill-list/home-skill-list.component';
import { HomeSoftSkillsComponent } from '@app/home-soft-skills/home-soft-skills.component';
import { HomeHobiesComponent } from '@app/home-hobies/home-hobies.component';
import { ContactMeComponent } from '@app/contact-me/contact-me.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    HomeHeroComponent, 
    HomeSkillListComponent, 
    HomeSoftSkillsComponent,
    HomeHobiesComponent,
    ContactMeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

import { Component } from '@angular/core';
import { HomeHeroComponent } from '../home-hero/home-hero.component';
import { HomeSkillListComponent } from '../home-skill-list/home-skill-list.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [HomeHeroComponent, HomeSkillListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

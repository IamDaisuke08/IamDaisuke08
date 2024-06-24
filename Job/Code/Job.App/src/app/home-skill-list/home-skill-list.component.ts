import { Component } from '@angular/core';
import { HomeSkillItemComponent } from '../home-skill-item/home-skill-item.component';

@Component({
  selector: 'home-skill-list',
  standalone: true,
  imports: [HomeSkillItemComponent],
  templateUrl: './home-skill-list.component.html',
  styleUrl: './home-skill-list.component.css'
})
export class HomeSkillListComponent {

}

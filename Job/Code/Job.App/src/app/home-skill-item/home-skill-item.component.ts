import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'home-skill-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './home-skill-item.component.html',
  styleUrl: './home-skill-item.component.css'
})
export class HomeSkillItemComponent {

  @Input() imageName : string = "";
  @Input() skillName : string = "";
  @Input() proficiencyValue : string = "";
  @Input() experienceValue : string = "";
  @Input() gotoValue : string = "";
  @Input() longDesc : string = "";
}

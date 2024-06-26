import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-skill-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './home-skill-item.component.html',
  styleUrl: './home-skill-item.component.css'
})
export class HomeSkillItemComponent {

  @Input() imageName : string = "";
  @Input() skillName : string = "";
  @Input() proficiencyValue : string = "";
  @Input() experienceValue : string = "";
  @Input() gotoValue : string = "";
}

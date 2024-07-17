import { Component } from '@angular/core';
import { HomeSkillItemComponent } from '@app/home-skill-item/home-skill-item.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'home-skill-list',
  standalone: true,
  imports: [HomeSkillItemComponent, NgOptimizedImage],
  templateUrl: './home-skill-list.component.html',
  styleUrl: './home-skill-list.component.css'
})
export class HomeSkillListComponent {

}

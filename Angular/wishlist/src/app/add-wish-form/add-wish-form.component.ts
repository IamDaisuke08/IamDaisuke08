import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WishItem } from '../../shared/models/wishitem';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-wish-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-wish-form.component.html',
  styleUrl: './add-wish-form.component.css'
})
export class AddWishFormComponent implements OnInit{
  @Output() addWish = new EventEmitter<WishItem>();
  constructor() {}

  ngOnInit(): void {
  }

  newWishText = '';

  addNewWish() {
    //this.items.push(new WishItem(this.newWishText));
    this.addWish.emit(new WishItem(this.newWishText));
    this.newWishText = '';
  }
}

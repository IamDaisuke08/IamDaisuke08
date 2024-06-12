import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishItem } from '../../shared/models/wishitem';
import { EventService } from './../../shared/services/EventService';
@Component({
  selector: 'wish-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css'
})
export class WishListItemComponent implements OnInit {
  // @Input() wishText! : string;
  // @Input() fullfilled! : boolean;
  // @Output() fullfilledChange = new EventEmitter<boolean>();

  @Input() wish! : WishItem
  constructor(private events: EventService) {}
  ngOnInit(): void {
  }

  get cssClasses() {
    //return this.fullfilled ? ['strikeout', 'text-muted'] : [];
    return {'strikeout text-muted' : this.wish.isComplete };
  }

  removeWish() {
    this.events.emit('removeWish', this.wish);
  }

  toggleFullfilled() {
    // this.fullfilled = !this.fullfilled;
    // this.fullfilledChange.emit(this.fullfilled);
    this.wish.isComplete = !this.wish.isComplete;
  }
}

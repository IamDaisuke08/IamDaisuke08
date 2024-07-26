import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Input() list : any[] = [];

  @Input() filter: any;
  @Output() filterChange = new EventEmitter<any>();

  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  @Input() labelFilter : string = "";

  constructor() { }

  updateFilter(value: any) {
    if (value == '0') {
      this.filter = () => 1 == 1;
    } else {
      this.filter = (item : any) => item.id == value;
    }
    this.filterChange.emit([this.filter, value]);
  }
}

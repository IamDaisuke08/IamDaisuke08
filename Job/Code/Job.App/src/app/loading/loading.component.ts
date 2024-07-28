import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LoadingService } from '@services/loading-service';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  load = inject(LoadingService);
  @Input() status = false;

  ngOnChanges() {
    this.load.loadingSub.next(this.status);
  }
}

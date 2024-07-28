import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

    loadingSub = new BehaviorSubject<boolean>(false);
    loading$ = of(this.loadingSub);

    Loading() {
        this.loadingSub.next(true);
    }

    Stop() {
        this.loadingSub.next(false);
    }
}
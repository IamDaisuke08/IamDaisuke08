import { Component, inject, Input, OnDestroy } from "@angular/core";
import { GenericItem } from "@models/genericItem";
import { AuthorisationService } from "@services/auth-service";
import { GenericHttpService } from "@services/generic-http.service";
import { finalize, Subscription } from "rxjs";

@Component({
    template: ''
  })
export class GenericCrud<T extends GenericItem> implements OnDestroy {

  @Input() collection : T[] = [];
  auth = inject(AuthorisationService);
  deleteSubs! : Subscription;
  updateSubs! : Subscription;
  addSubs! : Subscription;

  get IsLoggedIn() {
    let logged = false;
    const auths = this.auth.user$.subscribe(user => logged = user !== null);
    auths.unsubscribe();
    return logged;
  }

  constructor(public service : GenericHttpService<T>) {
  }

  ngOnDestroy(): void {
    this.deleteSubs?.unsubscribe();
    this.updateSubs?.unsubscribe();
    this.addSubs?.unsubscribe();
  }

  onEdit(item : T) {
    this.collection.forEach(s => {
      s.onEditMode = false;
    });
    item.onEditMode = true;
  }

  onCancelEdit(item : T) {
    item.onEditMode = false;
    if (item.id == 0) {
      this.collection.splice(0, 1);
    }
  }

  onSave(path : string, item: T) {
    if (this.IsLoggedIn) {
      if (item.id == 0) {
        this.add(path, item);
      } else {
        this.update(path, item);
      }
    }
  }
  
  onDelete(path : string, item: T) {
    if (this.IsLoggedIn) {
      if (confirm('Are you sure you want to delete this item?')) {
        const delCommand = this.service.delete(path, item.id);
        this.deleteSubs = delCommand.pipe(
          finalize(() => {
            let index = this.collection.indexOf(item);
            this.collection.splice(index, 1);
          }),
        ).subscribe({
          next: (() => console.log(`deleted jobstatus ${item.id}`)),
          error: ((error : any) => console.log(error.message))
        });
      }
    }
  }

  private update(path : string, item: T) {
    const updateCommand = this.service.update(path, item);
    this.updateSubs = updateCommand.pipe(
      finalize(() => item.onEditMode = false)
    ).subscribe({
      next: (() => {
        let log = `save successfull: ${ JSON.stringify(item) }`;
        console.log(log);
      }),
      error: ((error : any) => console.log(error.message))
    });
  }

  private add(path : string, item: T) {
    const addCommand = this.service.add(path, item);
    this.addSubs = addCommand.pipe(
      finalize(() => item.onEditMode = false)
    ).subscribe({
      next: ((newItem : any) => {
        let log = `save successfull: ${ JSON.stringify(newItem) }`;
        console.log(log);
        this.collection.splice(0, 1);
        this.collection.push(newItem);
      }),
      error: ((error : any) => console.log(error.message))
    });
  }
}
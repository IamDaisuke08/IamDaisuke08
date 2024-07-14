import { Component, Input } from "@angular/core";
import { GenericItem } from "@models/genericItem";
import { GenericHttpService } from "@services/generic-http.service";

@Component({
    template: ''
  })
export class GenericCrud<T extends GenericItem> {

    @Input() collection : T[] = [];

    constructor(public service : GenericHttpService<T>) {
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
        if (item.id == 0) {
          this.add(path, item);
        } else {
          this.update(path, item);
        }
      }
    
      onDelete(path : string, item: T) {
        this.service.delete(path, item.id).subscribe(() => {
          console.log(`deleted jobstatus ${item.id}`);
        },
        (error : any) => {
          console.log(error.message);
        },
        () => {
          let index = this.collection.indexOf(item);
          this.collection.splice(index, 1);
        });
      }
    
      private update(path : string, item: T) {
        this.service.update(path, item).subscribe(() => {
          let log = `save successfull: ${ JSON.stringify(item) }`;
          console.log(log);
        },
        (error : any) => {
          console.log(error.message);
        },
        () => {
          item.onEditMode = false;
        });
      }
    
      private add(path : string, item: T) {
        this.service.add(path, item).subscribe((newItem : any) => {
          let log = `save successfull: ${ JSON.stringify(newItem) }`;
          console.log(log);
          this.collection.splice(0, 1);
          this.collection.push(newItem);
        },
        (error : any) => {
          console.log(error.message);
        },
        () => {
          item.onEditMode = false;
        });
      }
}
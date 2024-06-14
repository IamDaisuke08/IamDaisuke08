import { Component, Input } from "@angular/core";
import { GenericItem } from "../shared/models/genericItem";
import { GenericHttpService } from "../shared/services/generic-http.service";

@Component({
    template: ''
  })
export class GenericCrud<T extends GenericItem> {

    @Input() collection : T[] = [];

    path : string = "";

    constructor(public service : GenericHttpService<T>) {
    }

    setPath(path : string) {
        this.service.Path = path;
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
    
      onSave(item: T) {
        if (item.id == 0) {
          this.add(item);
        } else {
          this.update(item);
        }
      }
    
      onDelete(item: T) {
        this.service.delete(item.id).subscribe(() => {
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
    
      private update(item: T) {
        this.service.update(item).subscribe(() => {
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
    
      private add(item: T) {
        this.service.add(item).subscribe((newItem : any) => {
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
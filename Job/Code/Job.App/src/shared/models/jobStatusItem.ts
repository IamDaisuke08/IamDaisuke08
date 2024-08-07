import { GenericItem } from "@models/genericItem";

export class JobStatusItem implements GenericItem {

    onEditMode: boolean = false;
    
    constructor(
        public id : number,
        public name : string,
        public createdDate : Date
    ) { }
}
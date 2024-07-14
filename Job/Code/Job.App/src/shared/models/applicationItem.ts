import { GenericItem } from "@models/genericItem";

export class ApplicationItem implements GenericItem {
    
    onEditMode: boolean = false;

    constructor(
        public id : number,
        public companyName : string,
        public position : string,
        public locationId : number,
        public statusId : number,
        public comment : string,
        public createdDate : Date 
    ) { }
}
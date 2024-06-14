import { GenericItem } from "./genericItem";

export class LocationItem implements GenericItem  {

    onEditMode: boolean = false;

    constructor(
        public id : number,
        public name : string,
        public createdDate : Date
    ) { }
}
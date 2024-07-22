import { GenericItem } from "@models/genericItem";

export class LocationItem implements GenericItem  {

    lng: number = 0;
    lat: number = 0;
    zoom : number = 0;
    onEditMode: boolean = false;
    selected: boolean = false;
    constructor(
        public id : number,
        public name : string,
        public createdDate : Date
    ) { }
}
import { GenericItem } from "@models/genericItem";

export class MessageItem implements GenericItem  {

    onEditMode: boolean = false;

    constructor(
        public id : number,
        public name : string,
        public emailaddress : string,
        public mobilenumber : string,
        public message : string
    ) { }
}
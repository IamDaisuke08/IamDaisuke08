import { GenericItem } from "@models/genericItem";

export class MessageDto implements GenericItem {
    id: number = 0;
    onEditMode: boolean = false;
    
    constructor(
        public sender : string,
        public subject : string,
        public message : string
    ) { }
}
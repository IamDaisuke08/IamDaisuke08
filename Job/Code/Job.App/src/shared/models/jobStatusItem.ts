export class JobStatusItem {

    onEditMode: boolean = false;
    
    constructor(
        public id : number,
        public name : string,
        public createdDate : Date
    ) { }
}
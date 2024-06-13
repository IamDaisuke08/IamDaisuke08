export class ApplicationItem {
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
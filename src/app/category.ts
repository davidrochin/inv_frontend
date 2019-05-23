export class Category {

    id : number;
    name : string;
    color : string;

    constructor(id? : number, name? : string){
        this.id = id;
        this.name = name;
    }

    static categories = {};
}
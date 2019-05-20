export class Category {

    url : string;
    name : string;

    constructor(url : string, name : string){
        this.url = url;
        this.name = name;
    }

    static categories = {};
}
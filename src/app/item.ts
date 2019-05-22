export class Item {
    id: number;
    name: string;
    price: number;
    category_id: number;
    provider_id: number = 1;
    code: string = "nocode";

    static items = {};
}
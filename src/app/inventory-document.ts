import { Detail } from './detail';
import { Category } from './category';
import { Item } from './item';

export class InventoryDocument {
    id: number;
    date: Date = new Date();
    details: Detail[] = [];
    indicator_category_percentages : number[] = [];
    indicator_categories : Category[] = [];

    public copy(object : any) : InventoryDocument {
        this.id = object.id;
        this.date = object.date;
        return this;
    }

    public calculatePercentages() : void{
        let totalQuantity : number = 0;
        let sums = {};
        
        this.details.forEach(det => {
            totalQuantity += Number(det.quantity_in);
            sums[Item.items[det.item_id].category_id] = 0;
        });
        
        this.details.forEach(det => {
            sums[Item.items[det.item_id].category_id] = Number(sums[Item.items[det.item_id].category_id]) + Number(det.quantity_in);
        });

        this.indicator_categories = Array(Object.keys(sums).length);
        let i = 0;
        for(var key in sums){
            this.indicator_categories[i] = Category.categories[key];
            this.indicator_category_percentages[i] = sums[key] / totalQuantity;
            i++;
        }
        console.log(this.indicator_categories);
        console.log(this.indicator_category_percentages);
    }
}
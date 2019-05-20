import { Detail } from './detail';

export class InventoryDocument {
    url: string;
    date: Date = new Date();
    details: Detail[] = [];
    category_percentages : string[] = [];
}
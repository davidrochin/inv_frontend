import { Detail } from './detail';

export class InventoryDocument {
    id: number;
    date: Date = new Date();
    details: Detail[] = [];
}
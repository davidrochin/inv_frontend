import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  data : Item[] = [
    { id: 1, name: 'Coca-cola 600ml', price: 15},
    { id: 2, name: 'Coca-cola 1L', price: 20},
    { id: 3, name: 'Coca-cola 2L', price: 25},
    { id: 4, name: 'Pepsi 600ml', price: 15},
    { id: 5, name: 'Pepsi 1L', price: 15},
    { id: 6, name: 'Pepsi 2L', price: 15},
  ];

  constructor() { }

  getAll(): Observable<Item[]> {
    return of(this.data);
  }

  get(id: number): Observable<Item> {
    return of(this.data[id]);
  }
}

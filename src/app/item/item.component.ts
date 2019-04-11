import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})

export class ItemComponent implements OnInit {

  item: Item;

  categories: Object = [
    {id: 1, name: 'Alimentos' },
    {id: 2, name: 'Bebidas' },
    {id: 3, name: 'Limpieza' },
    {id: 4, name: 'Higiene' },
    {id: 5, name: 'Otros' },
  ];

  constructor(private route: ActivatedRoute, private location: Location, private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.get(1).subscribe(item => {
      this.item = item;
    });
  }

}

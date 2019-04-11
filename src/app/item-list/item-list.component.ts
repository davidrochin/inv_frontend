import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {

  dataSource: Item[];

  displayedColumns: string[] = ['id', 'name', 'price'];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getAll().subscribe(items => {
      this.dataSource = items;
    });
    
  }

}

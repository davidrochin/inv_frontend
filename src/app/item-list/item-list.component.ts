import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../item';
import { DataSource } from '@angular/cdk/table';
import { RestApiService } from "../shared/rest-api";

import {MatPaginatorModule, MatPaginator, PageEvent} from '@angular/material/paginator';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {

  page : number = 1;
  count : number = 0;

  dataSource: Item[];
  displayedColumns: string[] = ['name', 'price', 'category'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public restApi: RestApiService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.page = this.paginator.pageIndex + 1;

    // Obtener todos los items desde la API
    this.restApi.getItems(this.page).subscribe(json => {
      let items: Item[];
      items = json.results;
      this.count = json.count;
      console.log(items);
      this.dataSource = items;

      this.paginator.length = this.count;
    });
  }

}

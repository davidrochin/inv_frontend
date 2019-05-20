import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from '../shared/rest-api';
import { MatPaginator } from '@angular/material';
import { InventoryDocument } from '../inventory-document';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.sass']
})
export class DocumentListComponent implements OnInit {

  page : number = 1;
  count : number = 0;

  details = {};

  dataSource: InventoryDocument[];
  displayedColumns: string[] = ['date', 'indicator', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public restApi: RestApiService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.page = this.paginator.pageIndex + 1;

    // Obtener todos los items desde la API
    this.restApi.getDocuments(this.page).subscribe(json => {
      let items: InventoryDocument[];
      items = json.results;
      this.count = json.count;
      console.log(items);
      this.dataSource = items;

      this.paginator.length = this.count;
    });

    // Obtener todos los detalles desde la API
    this.restApi.getDocuments(this.page).subscribe(json => {
      let items: InventoryDocument[];
      items = json.results;
      this.count = json.count;
      console.log(items);
      this.dataSource = items;

      this.paginator.length = this.count;
    });
  }

}

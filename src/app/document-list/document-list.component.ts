import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from '../shared/rest-api';
import { MatPaginator, MatDialog } from '@angular/material';
import { InventoryDocument } from '../inventory-document';
import { Detail } from '../detail';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';

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

  constructor(public restApi: RestApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.page = this.paginator.pageIndex + 1;

    this.restApi.getDocuments(this.page).subscribe(json => {
      let docs: InventoryDocument[];
      docs = json.results;
      this.count = json.count;
      this.dataSource = docs;

      // Transformar los JSON a InventoryDocument
      for(let i = 0; i < docs.length; i++){
        docs[i] = new InventoryDocument().copy(docs[i]);
      }

      this.paginator.length = this.count;

      // Get movements for each document
      this.dataSource.forEach(doc => {
        this.restApi.getMovements(doc.id).subscribe(json => {
          //doc = new InventoryDocument().copy(doc);
          let movs: Detail[];
          movs = json.results;
          doc.details = movs;
          console.log("Got details for:");
          console.log(doc);
          doc.calculatePercentages();
        });
      });
    });
  }

  openDocument(id : number) {
    this.restApi.getDocument(id).subscribe(resp => {
      const dialogRef = this.dialog.open(DocumentDialogComponent, {
        width: '1000px',
        hasBackdrop: true,
        disableClose: true,
        data: {document: resp}
        //data: {name: this.name, animal: this.animal}
      });
      
    }, err => {
      alert(err);
    });
  }

}

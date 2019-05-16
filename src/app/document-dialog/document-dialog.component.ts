import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ItemComponent } from '../item/item.component';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { InventoryDocument } from '../inventory-document';
import { Detail } from '../detail';
import { RestApiService } from '../shared/rest-api';
import { Item } from '../item';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.sass']
})
export class DocumentDialogComponent implements OnInit {

  inventoryDocument: InventoryDocument = new InventoryDocument();

  items : Item[] = [];

  dataSource: Detail[];
  displayedColumns: string[] = ['item', 'quantity'];

  constructor(public dialogRef: MatDialogRef<ItemComponent>, public dialog: MatDialog, public restApi: RestApiService) { }

  ngOnInit() {
    this.dataSource = this.inventoryDocument.details;

    // Obtener todos los items desde la API y guardarlos en cache
    this.restApi.getItems().subscribe(json => {
      json.results.forEach(element => {
        this.items[element.id] = element;
      });
    });
  }

  openDetailDialog(): void {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '300px',
      hasBackdrop: true,
      disableClose: false,
      data: { inventoryDocument: this.inventoryDocument }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.inventoryDocument);

      this.dataSource = [...this.inventoryDocument.details];

      //this.animal = result;
      //this.itemList.refresh();
    });
  }

  onSave() {

    // Save document
    let o = this.restApi.createDocument(this.inventoryDocument);
    o.subscribe(
      x => {
        //this.inventoryDocument = x
        let document_id = x.id;

        // Save its details
        //console.log(this.inventoryDocument);
        this.inventoryDocument.details.forEach(detail => {
          detail.document_id = document_id;
          this.restApi.createDetail(detail).subscribe(x => {
            console.log(detail);
          }, err => {
            console.error('Observer got an error: ' + err);
          });
        });
      },
      err => console.error('Observer got an error: ' + err));
  }

}

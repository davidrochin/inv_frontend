import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ItemComponent } from '../item/item.component';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { InventoryDocument } from '../inventory-document';
import { Detail } from '../detail';
import { RestApiService } from '../shared/rest-api';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.sass']
})
export class DocumentDialogComponent implements OnInit {

  inventoryDocument: InventoryDocument = new InventoryDocument();

  dataSource: Detail[];
  displayedColumns: string[] = ['item', 'quantity'];

  constructor(public dialogRef: MatDialogRef<ItemComponent>, public dialog: MatDialog, public restApi: RestApiService) { }

  ngOnInit() {
    this.dataSource = this.inventoryDocument.details;
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
      x => console.log('Observer got a next value: ' + x),
      err => console.error('Observer got an error: ' + err));
      
    console.log(o);

    // Set document_id to details

    // Save details
    this.inventoryDocument.details.forEach(detail => {
      this.restApi.createDetail(detail);
    });
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ItemComponent } from '../item/item.component';
import { Item } from '../item';
import { RestApiService } from '../shared/rest-api';
import { InventoryDocument } from '../inventory-document';
import { Detail } from '../detail';
import { Category } from '../category';
import { ItemSearchDialogComponent } from '../item-search-dialog/item-search-dialog.component';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.sass']
})
export class DetailDialogComponent implements OnInit {

  inventoryDocument : InventoryDocument;
  items : Item[];

  categories = Category.categories;

  selectedItem;
  selectedQuantity : number;

  constructor(public dialogRef: MatDialogRef<DetailDialogComponent>, public dialog: MatDialog, public restApi: RestApiService, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {

    //console.log(this.data);
    this.inventoryDocument = this.data.inventoryDocument;

    // Obtener todos los items desde la API
    this.restApi.getItems().subscribe(json => {
      this.items = json.results;
    });
  }

  onSave(){
    let detail : Detail = new Detail();
    detail.item_id = this.selectedItem;

    detail.quantity_in = this.selectedQuantity;
    this.inventoryDocument.details.push(detail);
    //console.log(this.inventoryDocument);
    this.dialogRef.close();
  }

  openItemSearch() {

    console.log(this.selectedItem);

    const dialogRef = this.dialog.open(ItemSearchDialogComponent, {
      width: '300px',
      hasBackdrop: true,
      disableClose: false,
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.selectedItem = result.id;
      }
    });
  }

}

export interface DialogData {
  inventoryDocument: InventoryDocument;
}

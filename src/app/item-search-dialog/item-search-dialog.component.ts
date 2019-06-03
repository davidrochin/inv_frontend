import { Component, OnInit, Inject, Input } from '@angular/core';
import { Item } from '../item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RestApiService } from '../shared/rest-api';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-item-search-dialog',
  templateUrl: './item-search-dialog.component.html',
  styleUrls: ['./item-search-dialog.component.sass']
})
export class ItemSearchDialogComponent implements OnInit {

  query : string = '';

  items = Item.items;
  filteredItems = this.items;

  constructor(public dialogRef: MatDialogRef<ItemSearchDialogComponent>, public restApi: RestApiService, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {

    // Obtener todos los items desde la API
    /*this.restApi.getItems().subscribe(json => {
      this.items = json.results;
    });*/
  }

  onInput(){
    if(this.query.length == 0){
      this.filteredItems = this.items;
    } else {
      this.filteredItems = {};
      for(var key in this.items){
        let value = this.items[key];
        let regex : RegExp = new RegExp("" + this.query + "", "i");
        if(value.name.match(regex)){
          this.filteredItems[value.id] = value;
        }
      }
    }
  }

  onSelect(item : Item) {
    this.dialogRef.close(item);
  }

  onSave() {
    /*let detail : Detail = new Detail();
    detail.item_id = this.selectedItem;

    detail.quantity_in = this.selectedQuantity;
    this.inventoryDocument.details.push(detail);
    //console.log(this.inventoryDocument);
    this.dialogRef.close();*/
  }

}

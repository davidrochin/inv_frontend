import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemComponent } from '../item/item.component';
import { Item } from '../item';
import { RestApiService } from '../shared/rest-api';
import { InventoryDocument } from '../inventory-document';
import { Detail } from '../detail';
import { Category } from '../category';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.sass']
})
export class CategoryDialogComponent implements OnInit {

  category : Category = new Category();

  constructor(public dialogRef: MatDialogRef<ItemComponent>, public restApi: RestApiService) { }

  ngOnInit() {
    console.log(this.category);
  }

  onSave(){
    console.log(this.category);
    this.restApi.createCategory(this.category).subscribe(response => {

      this.dialogRef.close(response);
    });
  }

}


import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { RestApiService } from "../shared/rest-api";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { Category } from '../category';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})

export class ItemComponent implements OnInit {

  item: Item = new Item();

  categories = Category.categories;

  constructor(private route: ActivatedRoute, private location: Location, public restApi: RestApiService, 
    public dialogRef: MatDialogRef<ItemComponent>) { }

  ngOnInit() {
    console.log(this.categories);
    /*this.restApi.getItem(1).subscribe(item => {
      this.item = item;
    });*/
  }

  onSubmit() : void{
    console.log(this.item);
    this.restApi.createItem(this.item).subscribe(response => {
      //alert(response);
      this.dialogRef.close();
    });
  }

  onCancel() : void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    alert("No cliiic");
    this.dialogRef.close();
  }

  log(o: any){
    console.log(o);
  }

  get diagnostic() { return JSON.stringify(this.item); }

}

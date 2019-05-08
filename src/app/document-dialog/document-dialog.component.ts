import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.sass']
})
export class DocumentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ItemComponent>) { }

  ngOnInit() {
  }

}

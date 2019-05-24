import { ItemComponent } from './../item/item.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { Item } from "../item";
import { ItemListComponent } from '../item-list/item-list.component';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';
import { DocumentListComponent } from '../document-list/document-list.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass']
})
export class DocumentsComponent implements OnInit {

  @ViewChild(DocumentListComponent) documentList: DocumentListComponent;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DocumentDialogComponent, {
      width: '1000px',
      hasBackdrop: true,
      disableClose: true,
      //data: {}
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.documentList.refresh();

      //this.animal = result;
      //this.itemList.refresh();
    });
  }

}

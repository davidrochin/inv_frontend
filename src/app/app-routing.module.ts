import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemsComponent } from './items/items.component';
import { HomeComponent } from './home/home.component';
import { DocumentsComponent } from './documents/documents.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'documents', component: DocumentsComponent },
  //{ path: 'item/:id', component: ItemComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
  
}
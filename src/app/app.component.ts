import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { RestApiService } from './shared/rest-api';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  title = 'Inventario Simple';

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    
    // Inicializar las categorias
    this.restApi.getCategories().subscribe(json => {
      json.results.forEach(element => {
        Category.categories[element.id] = element;
      });
    });

    // Obtener todos los items desde la API y guardarlos en cache
    this.restApi.getItems().subscribe(json => {
      json.results.forEach(element => {
        Item.items[element.id] = element;
      });
    });

  }
}

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
    Category.categories[1] = new Category(1, "Alimentos");
    Category.categories[2] = new Category(2, "Bebidas");
    Category.categories[3] = new Category(4, "Limpieza");
    Category.categories[4] = new Category(5, "Higiene");
    Category.categories[5] = new Category(6, "Electrónica");
    Category.categories[6] = new Category(7, "Ropa");
    Category.categories[7] = new Category(8, "Otros");

    // Obtener todos los items desde la API y guardarlos en cache
    this.restApi.getItems().subscribe(json => {
      json.results.forEach(element => {
        Item.items[element.url] = element;
      });
    });

  }
}

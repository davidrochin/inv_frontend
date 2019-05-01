import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../item';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  // Define API
  apiURL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }  

  // HttpClient API get() method => Fetch employees list
  getItems(page? : Number): Observable<any> {
    return this.http.get<Item>(this.apiURL + '/items?' + (page ? "page=" + page : ""))
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // HttpClient API get() method => Fetch employee
  getItem(id): Observable<any> {
    return this.http.get<Item>(this.apiURL + '/items/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create employee
  createItem(employee): Observable<any> {
    return this.http.post<Item>(this.apiURL + '/items/', JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update employee
  updateItem(id, item): Observable<any> {
    return this.http.put<Item>(this.apiURL + '/items/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete employee
  deleteItem(id){
    return this.http.delete<Item>(this.apiURL + '/items/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}
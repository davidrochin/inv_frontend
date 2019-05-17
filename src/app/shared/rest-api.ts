import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../item';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Detail } from '../detail';
import { InventoryDocument } from '../inventory-document';

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

  getDocuments(page? : Number): Observable<any> {
    return this.http.get<Document>(this.apiURL + '/documents?' + (page ? "page=" + page : ""))
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getItem(id): Observable<any> {
    return this.http.get<Item>(this.apiURL + '/items/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  createItem(employee): Observable<any> {
    return this.http.post<Item>(this.apiURL + '/items/', JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createDetail(detail): Observable<any> {
    return this.http.post<Detail>(this.apiURL + '/movements/', JSON.stringify(detail), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createDocument(doc): Observable<any> {

    let object : any = new Object();
    object.date = this.dateToString(doc.date);

    console.log(JSON.stringify(object));

    return this.http.post<InventoryDocument>(this.apiURL + '/documents/', JSON.stringify(object), this.httpOptions)
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

  dateToString(date : Date): string{
    return (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay())
  }

}
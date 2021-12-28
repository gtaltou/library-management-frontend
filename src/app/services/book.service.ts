import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Category } from "src/app/models/category";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Book } from "src/app/models/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) { }
    
    /**
     * Get all book's categories as reference data from Backend server.
     */
     loadCategories(): Observable<Category[]>{
         let headers = new HttpHeaders();
         headers.append('content-type', 'application/json');
         headers.append('accept', 'application/json');
         return this.http.get<Category[]>('/library/rest/category/api/allCategories', {headers: headers});
     }
     
    /**
     * Save a new Book object in the Backend server data base.
     * @param book
     */
     saveBook(book: Book): Observable<Book>{
         return this.http.post<Book>('/library/rest/book/api/addBook', book);
     }
     
     /**
      * Update an existing Book object in the Backend server data base.
      * @param book
      */
      updateBook(book: Book): Observable<Book>{
          return this.http.put<Book>('/library/rest/book/api/updateBook', book);
      }
      
      /**
       * Delete an existing Book object in the Backend server data base.
       * @param book
       */
       deleteBook(book: Book): Observable<string>{
           return this.http.delete<string>('/library/rest/book/api/deleteBook/'+book.id);
       }
     
     /**
      * Search books by isbn
      * @param isbn
      */
     searchBookByIsbn(isbn: string): Observable<Book>{
         return  this.http.get<Book>('/library/rest/book/api/searchByIsbn?isbn='+isbn);
     }
     
    /**
     * Search books by title
     * @param title
     */
     searchBookByTitle(title: string): Observable<Book[]>{
             return this.http.get<Book[]>('/library/rest/book/api/searchByTitle?title='+title);
     }
}

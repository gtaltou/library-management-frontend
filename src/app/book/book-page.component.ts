import { Component, OnInit } from '@angular/core';
import { Category } from "src/app/models/category";
import { Book } from "src/app/models/book";
import { NgForm } from "@angular/forms";
import { BookService } from "src/app/services/book.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
    
    public types = [ 'Isbn', 'Title'];
    public isbn: string;
    public title: string;
    public displayType: string = 'Isbn'
    public headsTab = ['ISBN', 'TITLE', 'AUTHOR', 'RELEASE DATE', 'REGISTER DATE', 'TOTAL EXAMPLARIES', 'CATEGORY'];
    public isNoResult: boolean = true;
    public isFormSubmitted: boolean = false;
    public actionButton: string = 'Save';
    public titleSaveOrUpdate: string = 'Add New Book Form';
    public messageModal: string;
    public displayMessageModal: boolean = false;
    
    public categories: Category[] = [{code:"", label:""}];
    public book = new Book();
    public searchBooksResult: Book[] = [];
    
  constructor(private bookService: BookService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
      //load book's categories when 
      //loading this component.
      this.loadCategories();
  }
  
 /**
  * Method that load book's categories
  * from the Backend server.
  */
  loadCategories(){
    this.spinner.show();
      this.bookService.loadCategories().subscribe(
              (result: Category[]) => {
                this.spinner.hide(); 
                 this.categories.push.apply(this.categories, result);
              },
              error => {
                this.spinner.hide();
                this.buildMessageModal('An error occurs when retreiving categories data');
              }
      );
  }
  
 /**
  * Method that save in the Backend server,
  *  a new book data retreived from the form
  * @param addBookForm
  */
  saveOrUpdateBook(addBookForm: NgForm){
      this.displayMessageModal = false;
      if(!addBookForm.valid){
          window.alert('Error in the form');
      }
      this.setLocalDateToDatePicker(this.book);
      if(this.actionButton && this.actionButton === 'Save'){
          this.saveNewBook(this.book);
      }else if(this.actionButton && this.actionButton === 'Update'){
          this.updateBook(this.book);
      }
      this.titleSaveOrUpdate = 'Add New Book Form';
      this.actionButton = 'Save';
  }
  
 /**
  * Save zone local date to the book releaseDate property : 
  *   there is a recognized problem with datepicker @angular/material timezone conversion.
  * @param book
  */
  setLocalDateToDatePicker(book: Book){
      var localDate = new Date(book.releaseDate);
      if(localDate.getTimezoneOffset() < 0){
          localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset() );
      }else{
        localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() );
      }
      book.releaseDate = localDate;
  }
  
 /**
  * Save new book
  * @param book
  */
  saveNewBook(book: Book){
      this.spinner.show();
      this.bookService.saveBook(book).subscribe(
              (result: Book) => {
                 if(result.id){
                    this.spinner.hide();
                    this.buildMessageModal('Save operation correctly done');
                 }
              },
              error => {
                  this.spinner.hide();
                  this.buildMessageModal('An error occurs when saving the book data');
              }
      );
  }
  
  /**
   * Update an existing book
   * @param book
   */
   updateBook(book: Book){
    this.spinner.show();
       this.bookService.updateBook(book).subscribe(
               (result: Book) => {
                  if(result.id){
                    this.updateResearchBooksTab(book);
                    this.spinner.hide();
                    this.buildMessageModal('Update operation correctly done');
                  }
               },
               error => {
                   this.spinner.hide();
                   this.buildMessageModal('An error occurs when updating the book data');
               }
       );
   }

   /**
    * Update in the list tab, the book that has been updated
    * @param book 
    */
   updateResearchBooksTab(book: Book){
        if(this.searchBooksResult && this.searchBooksResult.length > 0){
            let index : number = 0;
            this.searchBooksResult.forEach(element => {
                if(element.id == book.id){
                    this.searchBooksResult.splice(index, 1, book);
                }
                index++;
            });
        }
   }
   
   /**
    * Delete an existing book
    * @param book
    */
    deleteBook(book: Book){
        this.spinner.show();
        this.displayMessageModal = false;
        this.bookService.deleteBook(book).subscribe(
                result => {
                    for( var i = 0; i < this.searchBooksResult.length; i++){ 
                        if ( this.searchBooksResult[i].id === book.id) {
                            this.searchBooksResult.splice(i, 1); 
                        }
                    }
                    this.spinner.hide();
                    this.buildMessageModal('End of delete operation');
                    if(this.searchBooksResult.length == 0){
                        this.isNoResult = true;
                    }
                });
    }
  
  /**
   * Set the selected book as the book to be updated
   * @param book
   */
   setUpdateBook(book: Book){
       this.titleSaveOrUpdate = 'Update Book Form';
       this.actionButton = 'Update';
       this.book = Object.assign({}, book);
       this.displayMessageModal = false;
   }
   
 /**
  * Erase all data from this NgForm.
  * @param addBookForm
  */
  clearForm(addBookForm: NgForm){
      addBookForm.form.reset(); 
      this.displayMessageModal = false;
  }
  
 /**
  * Search books by title or by isbn
  * @param searchBookForm
  */
  searchBooksByType(searchBookForm){
      this.spinner.show();
      this.displayMessageModal = false;
      if(!searchBookForm.valid){
        this.buildMessageModal('Error in the form');
      }
      if(this.displayType === 'Isbn'){
          this.searchBooksResult = [];
          this.bookService.searchBookByIsbn(this.isbn).subscribe(
                  result => {
                      if(result && result != null){
                          this.searchBooksResult.push(result);
                          this.isNoResult = false;
                          this.spinner.hide();
                          return;
                       }
                       this.isNoResult = true;
                       this.spinner.hide();
                  },
                  error => {
                    this.spinner.hide();
                    this.buildMessageModal('An error occurs when searching the book data');
                  }
          );
      } else if(this.displayType === 'Title'){
          this.searchBooksResult = [];
          this.bookService.searchBookByTitle(this.title).subscribe(
                  result => {
                      if(result && result != null){
                          this.searchBooksResult = result;
                          this.isNoResult = false;
                          this.spinner.hide();
                          return;
                      }
                      this.isNoResult = true;
                      this.spinner.hide();
                  },
                  error => {
                    this.spinner.hide();
                    this.buildMessageModal('An error occurs when searching the book data');
                  }
          );
      }
      this.isFormSubmitted = searchBookForm.submitted;
  }

  /**
   * Construit le message à afficher suite à une action utilisateur.
   * @param msg 
   */
  buildMessageModal(msg: string){
      this.messageModal = msg;
      this.displayMessageModal = true;
  }

}

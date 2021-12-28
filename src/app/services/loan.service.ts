import { Injectable } from '@angular/core';
import { SimpleLoan } from '../models/simple-loan';
import { Loan } from '../models/loan';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mail } from '../models/mail';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }
        
    /**
     * Save a new simpleLoan object in the Backend server data base.
     * @param book
     */
    saveLoan(simpleLoan: SimpleLoan): Observable<Loan>{
         return this.http.post<Loan>('/library/rest/loan/api/addLoan', simpleLoan);
     }
       
      /**
       * Close an existing loan object in the Backend server data base.
       * @param loan
       */
      closeLoan(simpleLoan: SimpleLoan): Observable<Boolean>{
           return this.http.post<Boolean>('/library/rest/loan/api/closeLoan', simpleLoan);
       }
     
     /**
      * Search Loans by email
      * @param email
      */
     searchLoansByEmail(email: string): Observable<Loan[]>{
         return  this.http.get<Loan[]>('/library/rest/loan/api/customerLoans?email='+email);
     }

     /**
      * Search Loans by maximum date
      * @param maxDate
      */
     searchLoansByMaximumDate(maxDate: Date): Observable<Loan[]>{
       let month : string = maxDate.getMonth() < 10 ? '0'+(maxDate.getMonth()+1): ''+(maxDate.getMonth()+1);
       let dayOfMonth : string = maxDate.getDate() < 10 ? '0'+maxDate.getDate(): ''+maxDate.getDate();
       let maxDateStr : string = maxDate.getFullYear() + '-' + month + '-' + dayOfMonth;
      return  this.http.get<Loan[]>('/library/rest/loan/api/maxEndDate?date='+maxDateStr);
  }
     
    /**
     * Send an email to a customer
     * @param mail
     */
    sendEmail(mail: Mail): Observable<boolean>{
      //let headers = new HttpHeaders();
      //headers.append('responseType', 'arraybuffer'); , {headers: headers}
      return this.http.put<boolean>('/library/rest/customer/api/sendEmailToCustomer', mail);
    }
}

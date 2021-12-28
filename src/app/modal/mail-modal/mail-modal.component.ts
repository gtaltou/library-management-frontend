import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';
import { CustomerService } from '../../services/customer.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Mail } from '../../models/mail';


@Component({
  selector: 'app-mail-modal',
  templateUrl: './mail-modal.component.html',
  styleUrls: ['./mail-modal.component.css']
})
export class MailModalComponent implements OnInit {
  
  @Input('customerId') customerId: number;

  @Output() unDisplayModal = new EventEmitter();

  public emailSubject : string = '';
  public emailContent: string = '';

  constructor(private loanService: LoanService, private bookService: BookService, 
    private customerService: CustomerService, private http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
    
  closeEmailForm(){
    this.unDisplayModal.emit("");
  }

   /**
    * Send email to customer
    * @param sendEmailForm 
    */
   sendEmail(sendEmailForm: NgForm){
     this.spinner.show();
     let mail = new Mail();
     mail.customerId = this.customerId;
     if(sendEmailForm.value.subject && sendEmailForm.value.content){
       mail.emailSubject = sendEmailForm.value.subject;
       mail.emailContent = sendEmailForm.value.content;
       this.loanService.sendEmail(mail).subscribe(
         result => {
           if(result){
             this.spinner.hide();
             window.alert('Email sent');
             this.customerId = -1;
             this.emailContent = '';
             this.emailSubject = '';
          }
         },
         error => {
           this.spinner.hide();
           console.log(error);
           window.alert(error);
         }
       );
     }
   }

}

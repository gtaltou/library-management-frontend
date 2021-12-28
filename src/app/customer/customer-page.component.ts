import { Component, OnInit } from '@angular/core';
import { Category } from "src/app/models/category";
import { Book } from "src/app/models/book";
import { NgForm } from "@angular/forms";
import { BookService } from "src/app/services/book.service";
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {

    public types = [ 'Email', 'Last Name'];
    public email: string;
    public lastName: string;
    public displayType: string = 'Email'
    public headsTab = ['FIRST NAME', 'LAST NAME', 'EMAIL', 'JOB', 'ADDRESS'];
    public isNoResult: boolean = true;
    public isFormSubmitted: boolean = false;
    public actionButton: string = 'Save';
    public titleSaveOrUpdate: string = 'Add New Customer Form';
    public messageModal: string;
    public displayMessageModal: boolean = false;
    
    public customer = new Customer();
    public searchCustomersResult: Customer[] = [];
    
  constructor(private customerService: CustomerService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  
 
 /**
  * Method that save in the Backend server,
  *  a new customer data retreived from the form
  * @param addCustomerForm
  */
 saveOrUpdateCustomer(addCustomerForm: NgForm){
      this.displayMessageModal = false;
      if(!addCustomerForm.valid){
        this.buildMessageModal('Error in the form');
      }
      if(this.actionButton && this.actionButton === 'Save'){
          this.saveNewCustomer(this.customer);
      }else if(this.actionButton && this.actionButton === 'Update'){
          this.updateCustomer(this.customer);
      }
      this.titleSaveOrUpdate = 'Add New Customer Form';
      this.actionButton = 'Save';
  }
  
 /**
  * Save new customer
  * @param customer
  */
  saveNewCustomer(customer: Customer){
      this.spinner.show();
      this.customerService.saveCustomer(customer).subscribe(
              (result: Customer) => {
                 if(result.id){
                     this.spinner.hide();
                     this.buildMessageModal('Save operation correctly done');
                 }
              },
              error => {
                  this.spinner.hide();
                  this.buildMessageModal('An error occurs when saving the customer data');
              }
      );
  }
  
  /**
   * Update an existing customer
   * @param customer
   */
   updateCustomer(customer: Customer){
       this.spinner.show();
       this.customerService.updateCustomer(customer).subscribe(
               (result: Customer) => {
                  if(result.id){
                      this.updateResearchCustomerTab(customer);
                      this.spinner.hide();
                      this.buildMessageModal('Update operation correctly done');
                  }
               },
               error => {
                this.spinner.hide();
                this.buildMessageModal('An error occurs when updating the customer data');
               }
       );
   }

   /**
    * Update in the list tab, the customer that has been updated
    * @param customer 
    */
   updateResearchCustomerTab(customer: Customer){
        let index : number = 0; 
        if(this.searchCustomersResult && this.searchCustomersResult.length > 0){
            this.searchCustomersResult.forEach(element => {
                if(element.id == customer.id){
                    this.searchCustomersResult.splice(index, 1, customer);
            
                }
                index++;
            });
        }
   }
   
   /**
    * Delete an existing customer
    * @param customer
    */
    deleteCustomer(customer: Customer){
        this.spinner.show();
        this.displayMessageModal = false;
        this.customerService.deleteCustomer(customer).subscribe(
                result => {
                    for( var i = 0; i < this.searchCustomersResult.length; i++){ 
                        if ( this.searchCustomersResult[i].id === customer.id) {
                            this.searchCustomersResult.splice(i, 1); 
                        }
                    }
                    this.spinner.hide();
                    this.buildMessageModal('End of delete operation');
                    if(this.searchCustomersResult.length == 0){
                        this.isNoResult = true;
                    }
                });
    }
  
  /**
   * Set the selected customer as the customer to be updated
   * @param customer
   */
   setUpdateCustomer(customer: Customer){
       this.titleSaveOrUpdate = 'Update Customer Form';
       this.actionButton = 'Update';
       this.customer = Object.assign({}, customer);
   }
   
 /**
  * Erase all data from this NgForm.
  * @param addCustomerForm
  */
  clearForm(addCustomerForm: NgForm){
      addCustomerForm.form.reset(); 
      this.displayMessageModal = false;
  }
  
 /**
  * Search customers by title or by isbn
  * @param searchCustomerForm
  */
  searchCustomersByType(searchCustomerForm){
      this.spinner.show();
      this.displayMessageModal = false;
      if(!searchCustomerForm.valid){
        this.buildMessageModal('Error in the form');
      }
      if(this.displayType === 'Email'){
          this.searchCustomersResult = [];
          this.customerService.searchCustomerByEmail(this.email).subscribe(
                  result => {
                      if(result && result != null){
                          this.searchCustomersResult.push(result);
                          this.isNoResult = false;
                          this.spinner.hide();
                          return;
                       }
                       this.isNoResult = true;
                       this.spinner.hide();
                  },
                  error => {
                      this.spinner.hide();
                      this.buildMessageModal('An error occurs when searching the customer data');
                  }
          );
      } else if(this.displayType === 'Last Name'){
          this.searchCustomersResult = [];
          this.customerService.searchCustomerByLastName(this.lastName).subscribe(
                  result => {
                      if(result && result != null){
                          this.searchCustomersResult = result;
                          this.isNoResult = false;
                          this.spinner.hide();
                          return;
                      }
                      this.isNoResult = true;
                      this.spinner.hide();
                  },
                  error => {
                      this.spinner.hide();
                      this.buildMessageModal('An error occurs when searching the customer data');
                  }
          );
      }
      this.isFormSubmitted = searchCustomerForm.submitted;
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

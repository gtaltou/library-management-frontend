import { Book } from "src/app/models/book";
import { Customer } from "src/app/models/customer";

export class Loan {
    
    bookDTO: Book = new Book();

    customerDTO: Customer = new Customer();

    loanBeginDate: Date;

    loanEndDate: Date;
}

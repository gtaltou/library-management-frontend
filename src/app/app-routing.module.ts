// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MenuComponent } from 'src/app/menu/menu/menu.component';
import { BookPageComponent } from 'src/app/book/book-page.component';
import { CustomerPageComponent } from './customer/customer-page.component';
import { LoanPageComponent } from './loan/loan-page.component';

const routes: Routes = [
                        {path: '', component: MenuComponent},
                        {path: 'book-page', component: BookPageComponent},
                        {path: 'customer-page', component: CustomerPageComponent},
                        {path: 'loan-page', component: LoanPageComponent},
                        ];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

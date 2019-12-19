import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {CompanyLoanComponent} from './company/loan/company-loan.component';
import {AvailableLoanComponent} from './customer/customer-loan/available-loan.component';
import {CustomerMainComponent} from './customer/main/customer-main.component';
import {CompanyMainComponent} from './company/main/company-main.component';
import {RegistrationComponent} from "./registration/registration.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'admin', component: CompanyMainComponent, canActivate: [AuthGuardService], data: {roles: ['ROLE_COMPANY_ADMIN']}},
  {path: '', component: CustomerMainComponent, canActivate: [AuthGuardService], data: {roles: ['ROLE_CUSTOMER']}},
  {path: 'admin/loan/:loanId', component: CompanyLoanComponent, canActivate: [AuthGuardService], data: {roles: ['ROLE_COMPANY_ADMIN']}},
  {path: 'availableLoans', component: AvailableLoanComponent, canActivate: [AuthGuardService], data: {roles: ['ROLE_CUSTOMER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

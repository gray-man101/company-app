import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {CompanyLnComponent} from './company/ln/company-ln.component';
import {AvailableLnComponent} from './customer/customer-ln/available-ln.component';
import {CustomerMainComponent} from './customer/main/customer-main.component';
import {CompanyMainComponent} from './company/main/company-main.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: CompanyMainComponent, canActivate: [AuthGuardService], data: {roles: ['ROLE_COMPANY_ADMIN']}},
  {path: '', component: CustomerMainComponent, canActivate: [AuthGuardService], data: {roles: ['ROLE_CUSTOMER']}},
  {path: 'admin/ln/:lnId', component: CompanyLnComponent, canActivate: [AuthGuardService], data: {roles: ['ROLE_COMPANY_ADMIN']}},
  {path: 'availableLs', component: AvailableLnComponent, canActivate: [AuthGuardService], data: {roles: ['ROLE_CUSTOMER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

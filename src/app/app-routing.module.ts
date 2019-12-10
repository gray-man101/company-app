import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {CompanyLnComponent} from './company/ln/company-ln.component';
import {MainComponent} from './main/main.component';
import {AvailableLnComponent} from './customer/customer-ln/available-ln.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, canActivate: [AuthGuardService], data: {roles: ['COMPANY_ADMIN', 'CUSTOMER']}},
  {path: 'ln/:lnId', component: CompanyLnComponent, canActivate: [AuthGuardService], data: {roles: ['COMPANY_ADMIN']}},
  {path: 'availableLs', component: AvailableLnComponent, canActivate: [AuthGuardService], data: {roles: ['CUSTOMER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GeneralAuthGuardService} from './auth/general-auth-guard.service';
import {CompanyLnComponent} from './company/ln/company-ln.component';
import {AnonymousAuthGuardService} from './auth/anonymous-auth-guard.service';
import {MainComponent} from './main/main.component';
import {CompanyAuthGuardService} from './company/auth/company-auth-guard.service';
import {AvailableLnComponent} from './customer/customer-ln/available-ln.component';
import {CustomerAuthGuardService} from './customer/auth/customer-auth-guard.service';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AnonymousAuthGuardService]},
  {path: '', component: MainComponent, canActivate: [GeneralAuthGuardService]},
  {path: 'ln/:lnId', component: CompanyLnComponent, canActivate: [CompanyAuthGuardService]},
  {path: 'availableLs', component: AvailableLnComponent, canActivate: [CustomerAuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

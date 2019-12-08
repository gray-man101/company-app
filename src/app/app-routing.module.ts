import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GeneralAuthGuardService} from './auth/general-auth-guard.service';
import {LnComponent} from './company/ln/ln.component';
import {AnonymousAuthGuardService} from './auth/anonymous-auth-guard.service';
import {MainComponent} from './main/main.component';
import {CompanyAuthGuardService} from './company/auth/company-auth-guard.service';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AnonymousAuthGuardService]},
  {path: '', component: MainComponent, canActivate: [GeneralAuthGuardService]},
  {path: 'ln/:lnId', component: LnComponent, canActivate: [CompanyAuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {CompanyMainComponent} from './company/main/company-main.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CompanyLoanComponent} from './company/loan/company-loan.component';
import {CustomerMainComponent} from './customer/main/customer-main.component';
import {AvailableLoanComponent} from './customer/customer-loan/available-loan.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import {ErrorInterceptor} from './auth/error-interceptor';
import {RegistrationComponent} from "./registration/registration.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CompanyMainComponent,
    CompanyLoanComponent,
    CustomerMainComponent,
    AvailableLoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

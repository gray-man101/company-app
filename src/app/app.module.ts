import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {CompanyMainComponent} from './company/main/company-main.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CompanyLnComponent} from './company/ln/company-ln.component';
import { CustomerMainComponent } from './customer/main/customer-main.component';
import { MainComponent } from './main/main.component';
import { AvailableLnComponent } from './customer/customer-ln/available-ln.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyMainComponent,
    CompanyLnComponent,
    CustomerMainComponent,
    MainComponent,
    AvailableLnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

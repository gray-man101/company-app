import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {HttpClient} from '@angular/common/http';
import {AccountInfo} from '../account-info';
import {Investment} from '../../investment';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html'
})
export class CustomerMainComponent implements OnInit {

  showTopUpForm: boolean;
  topUpAmount: number;
  showWithdrawForm: boolean;
  withdrawAmount: number;
  accountInfo = new AccountInfo();
  investments: Investment[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  ngOnInit() {
    this.showTopUpForm = false;
    this.topUpAmount = 0;
    this.showWithdrawForm = false;
    this.withdrawAmount = 0;
    this.getAccountInfo();
    this.getActiveInvestments();
  }

  getAccountInfo() {
    this.httpClient.get('http://localhost:8080/api/account').subscribe(
      (accountInfo: AccountInfo) => {
        this.accountInfo = accountInfo;
      }
    );
  }

  getActiveInvestments() {
    this.httpClient.get('http://localhost:8080/api/investment').subscribe((data) => {
      this.investments = data['content'];
    });
  }

  topUp() {
    this.httpClient.post('http://localhost:8080/api/account/topUp', {amount: this.topUpAmount}).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('POST call in error', response);
        alert('failed to top up money: ' + response.error.message);
      }
    );
  }

  withdraw() {
    this.httpClient.post('http://localhost:8080/api/account/withdraw', {amount: this.withdrawAmount}).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('POST call in error', response);
        alert('failed to top up money: ' + response.error.message);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Ln} from '../../ln';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {

  private showTopUpForm: boolean;
  private topUpAmount: number;
  private showWithdrawForm: boolean;
  private withdrawAmount: number;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  ngOnInit() {
    this.showTopUpForm = false;
    this.topUpAmount = 0;
    this.showWithdrawForm = false;
    this.withdrawAmount = 0;
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

}

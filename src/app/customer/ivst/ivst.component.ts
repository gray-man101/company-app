import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-ivst',
  templateUrl: './ivst.component.html'
})
export class IvstComponent implements OnInit {

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

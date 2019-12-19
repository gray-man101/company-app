import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Loan} from '../../loan';

@Component({
  selector: 'app-customer-loan',
  templateUrl: './available-loan.component.html'
})
export class AvailableLoanComponent implements OnInit {

  loans: Loan[] = [];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getAvailableLoansForInvestment();
  }

  getAvailableLoansForInvestment() {
    this.httpClient.get('http://localhost:8080/api/availableLoan').subscribe((data) => {
      this.loans = data['content'];
    });
  }

  invest(id: number) {
    this.httpClient.post('http://localhost:8080/api/investment/' + id, null).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('POST call in error', response);
        alert('failed to invest in loan: ' + response.error.message);
      }
    );
  }

}

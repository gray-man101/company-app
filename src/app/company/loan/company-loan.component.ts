import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../../payment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-loan',
  templateUrl: './company-loan.component.html'
})
export class CompanyLoanComponent implements OnInit {

  private loanId: number;
  private ps: Payment[];
  private showNewPmForm: boolean;
  private newPm: Payment;
  private editPmId: number;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.ps = [];
    this.editPmId = null;
    this.showNewPmForm = false;
    this.newPm = new Payment();
    this.route.params.subscribe(params => {
      this.loanId = params['loanId'];
      this.getPs();
    });
  }

  getPs() {
    this.httpClient.get('http://localhost:8080/api/loan/' + this.loanId + '/payment')
      .subscribe((data) => {
        this.ps = data['content'];
      });
  }

  createPm() {
    this.httpClient.post('http://localhost:8080/api/loan/' + this.loanId + '/payment', this.newPm)
      .subscribe(
        (val) => {
          this.ngOnInit();
        },
        (response) => {
          console.log('POST call in error', response);
          alert('Failed to create payment: ' + response.error.message);
        }
      );
  }

  updatePayment(payment: Payment) {
    this.httpClient.put('http://localhost:8080/api/loan/' + this.loanId + '/payment/' + payment.id, payment).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('PUT call in error', response);
        alert('Failed to update pm: ' + response.error.message);
      }
    );
  }

  deletePayment(id: number) {
    this.httpClient.delete('http://localhost:8080/api/loan/' + this.loanId + '/payment/' + id)
      .subscribe(
        (val) => {
          this.ngOnInit();
        },
        (response) => {
          console.log('DELETE call in error', response);
          alert('Failed to delete payment: ' + response.error.message);
        }
      );
  }

  toggleCreateForm() {
    this.showNewPmForm = !this.showNewPmForm;
  }

  startEditingPayment(id: number) {
    this.editPmId = id;
  }

}

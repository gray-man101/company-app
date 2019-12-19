import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../../payment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-loan',
  templateUrl: './company-loan.component.html'
})
export class CompanyLoanComponent implements OnInit {

  loanId: number;
  payments: Payment[];
  showNewPaymentForm: boolean;
  newPayment: Payment;
  editPaymentId: number;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.payments = [];
    this.editPaymentId = null;
    this.showNewPaymentForm = false;
    this.newPayment = new Payment();
    this.route.params.subscribe(params => {
      this.loanId = params['loanId'];
      this.getPayments();
    });
  }

  getPayments() {
    this.httpClient.get('http://localhost:8080/api/loan/' + this.loanId + '/payment')
      .subscribe((data) => {
        this.payments = data['content'];
      });
  }

  createPayment() {
    this.httpClient.post('http://localhost:8080/api/loan/' + this.loanId + '/payment', this.newPayment)
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
        alert('Failed to update payment: ' + response.error.message);
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
    this.showNewPaymentForm = !this.showNewPaymentForm;
  }

  startEditingPayment(id: number) {
    this.editPaymentId = id;
  }

}

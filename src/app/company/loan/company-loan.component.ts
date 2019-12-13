import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../../payment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ln',
  templateUrl: './company-loan.component.html'
})
export class CompanyLoanComponent implements OnInit {

  private lnId: number;
  private ps: Payment[];
  private showNewPmForm: boolean;
  private newPm: Payment;
  private editPmId: number;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.editPmId = null;
    this.showNewPmForm = false;
    this.newPm = new Payment();
    this.route.params.subscribe(params => {
      this.lnId = params['lnId'];
      this.getPs();
    });
  }

  getPs() {
    this.httpClient.get('http://localhost:8080/api/ln/' + this.lnId + '/pm')
      .subscribe((data) => {
        this.ps = data['content'];
      });
  }

  createPm() {
    this.httpClient.post('http://localhost:8080/api/ln/' + this.lnId + '/pm', this.newPm)
      .subscribe(
        (val) => {
          this.ngOnInit();
        },
        (response) => {
          alert('Failed to create pm: ' + response.error.message);
          console.log('POST call in error', response);
        }
      );
  }

  updatePayment(payment: Payment) {
    this.httpClient.put('http://localhost:8080/api/loan/' + this.lnId + '/payment/' + payment.id, payment).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        alert('Failed to update pm: ' + response.error.message);
        console.log('PUT call in error', response);
      }
    );
  }

  deletePayment(id: number) {
    this.httpClient.delete('http://localhost:8080/api/loan/' + this.lnId + '/payment/' + id)
      .subscribe(
        (val) => {
          this.ngOnInit();
        },
        (response) => {
          alert('Failed to delete pm: ' + response.error.message);
          console.log('DELETE call in error', response);
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

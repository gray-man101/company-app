import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Loan} from '../../loan';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-company-main',
  templateUrl: './company-main.component.html'
})
export class CompanyMainComponent implements OnInit {

  loans: Loan[] = [];
  showNewLoanForm: boolean;
  editLoanId: number;
  newLoan: Loan;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.editLoanId = null;
    this.showNewLoanForm = false;
    this.newLoan = new Loan();
    this.getLoans();
  }

  getLoans() {
    this.httpClient.get('http://localhost:8080/api/loan').subscribe((data) => {
        this.loans = data['content'];
      },
      (response) => {
        console.log('GET call in error', response);
        alert('Failed to get loans: ' + response.error.message);
      });
  }

  createLoan() {
    this.httpClient.post('http://localhost:8080/api/loan', this.newLoan).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('POST call in error', response);
        alert('Failed to create loan: ' + response.error.message);
      }
    );
  }

  updateLoan(loan: Loan) {
    this.httpClient.put('http://localhost:8080/api/loan/' + loan.id, loan).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response: HttpErrorResponse) => {
        console.log('PUT call in error', response);
        alert('Failed to update loan: ' + response.error.message);
      }
    );
  }

  deleteLoan(id: number) {
    this.httpClient.delete('http://localhost:8080/api/loan/' + id).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('DELETE call in error', response);
        alert('Failed to delete loan: ' + response.error.message);
      }
    );
  }

  setFailedStatus(id: number) {
    this.httpClient.post('http://localhost:8080/api/loan/' + id + '/fail', null).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('POST call in error', response);
        alert('Failed to set loan status to failed: ' + response.error.message);
      }
    );
  }

  toggleUpdateForm(id: number) {
    this.editLoanId = id;
  }

  toggleCreateForm() {
    this.showNewLoanForm = !this.showNewLoanForm;
  }

  logout() {
    this.authService.logout();
  }

}

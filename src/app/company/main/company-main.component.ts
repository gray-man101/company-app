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
  editLnId: number;
  newLoan: Loan;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.editLnId = null;
    this.showNewLoanForm = false;
    this.newLoan = new Loan();
    this.getLs();
  }

  getLs() {
    this.httpClient.get('http://localhost:8080/api/loan').subscribe((data) => {
      this.loans = data['content'];
    });
  }

  createLoan() {
    this.httpClient.post('http://localhost:8080/api/loan', this.newLoan).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('POST call in error', response);
        alert('Failed to create loan');
      }
    );
  }

  updateLn(loan: Loan) {
    this.httpClient.put('http://localhost:8080/api/loan/' + loan.id, loan).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response:HttpErrorResponse) => {
        console.log('1PUT call in error', response);
        alert('Failed to update loan');
      }
    );
  }

  deleteLoan(id: number) {
    this.httpClient.delete('http://localhost:8080/api/loan/' + id).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        alert('Failed to delete loan: ' + response.error.message);
        console.log('DELETE call in error', response);
      }
    );
  }

  toggleUpdateForm(id: number) {
    this.editLnId = id;
  }

  toggleForm() {
    this.showNewLoanForm = !this.showNewLoanForm;
  }

}

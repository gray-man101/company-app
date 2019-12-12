import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Ln} from '../../ln';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-company-main',
  templateUrl: './company-main.component.html'
})
export class CompanyMainComponent implements OnInit {

  ls: Ln[] = [];
  showNewLnForm: boolean;
  editLnId: number;
  newLn: Ln;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.editLnId = null;
    this.showNewLnForm = false;
    this.newLn = new Ln();
    this.getLs();
  }

  getLs() {
    this.httpClient.get('http://localhost:8080/api/ln').subscribe((data) => {
      this.ls = data['content'];
    });
  }

  createLn() {
    this.httpClient.post('http://localhost:8080/api/ln', this.newLn).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        alert('Failed to create ln: ' + response.error.message);
        console.log('POST call in error', response);
      }
    );
  }

  updateLn(ln: Ln) {
    this.httpClient.put('http://localhost:8080/api/ln/' + ln.id, ln).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        alert('Failed to update ln: ' + response.error.message);
        console.log('PUT call in error', response);
      }
    );
  }

  deleteLn(id: number) {
    this.httpClient.delete('http://localhost:8080/api/ln/' + id).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        alert('Failed to delete ln: ' + response.error.message);
        console.log('DELETE call in error', response);
      }
    );
  }

  toggleUpdateForm(id: number) {
    this.editLnId = id;
  }

  toggleForm() {
    this.showNewLnForm = !this.showNewLnForm;
  }

}

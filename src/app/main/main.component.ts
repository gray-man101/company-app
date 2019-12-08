import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ln} from '../ln';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ls: Ln[] = [];
  showNewLnForm: boolean;
  editLnId: number;
  newLn: Ln;

  constructor(private httpClient: HttpClient) {
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

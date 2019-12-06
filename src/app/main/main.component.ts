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
  showForm: boolean;
  newLn: Ln = new Ln();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.newLn = new Ln()
    this.httpClient.get('http://localhost:8080/api/ln').subscribe((data: Ln[]) => {
      this.ls = data['content']
      console.log(this.ls)
    })
  }

  addNewLn() {
    this.httpClient.post('http://localhost:8080/api/ln', this.newLn).subscribe(
      (val) => {
        console.log("POST call successful");
        this.ngOnInit()
      },
      (response) => {
        console.log("POST call in error", response);
      }
    );
  }

  showNewLoanForm(){
    return this.showForm;
  }

  deleteLn(id: number){
    this.httpClient.delete('http://localhost:8080/api/ln/' + id).subscribe(
      (val) => {
        this.ngOnInit()
      },
      (response) => {
        console.log("DELETE call in error", response);
      }
    )
  }

  toggleForm(){
    this.showForm = true
  }

}

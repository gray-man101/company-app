import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ln} from "../ln";

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
    this.httpClient.post(
      'http://localhost:8080/graphql/api/v1',
      'query {\n' +
      '    ls {\n' +
      '        id\n' +
      '        amount\n' +
      '        dbName\n' +
      '        status\n' +
      '    }\n' +
      '}'
    ).subscribe((data: Ln[]) => {
      this.ls = data['ls']
      console.log(this.ls)
    })
  }

  addNewLn() {
    this.httpClient.post('http://localhost:8080/ln', this.newLn).subscribe(
      (val) => {
        console.log("POST call successful value returned in body");
        console.log(val)
      },
      (response) => {
        console.log("POST call in error", response);
      }
    );
  }

  showNewLoanForm(){
    return this.showForm;
  }

  toggleForm(){
    this.showForm = true
  }

}

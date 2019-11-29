import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ln} from "../ln";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ls: Ln[] = []

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/ls').subscribe((data: Ln[]) => {
      this.ls = data['ls']
      console.log(this.ls)
    })
  }

}

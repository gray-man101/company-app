import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ln',
  templateUrl: './ln.component.html',
  styleUrls: ['./ln.component.css']
})
export class LnComponent implements OnInit {

  private id: number;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    console.log(this.route.params['id']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}

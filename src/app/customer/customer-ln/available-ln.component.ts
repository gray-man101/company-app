import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ln} from '../../ln';

@Component({
  selector: 'app-customer-ln',
  templateUrl: './available-ln.component.html',
  styleUrls: ['./available-ln.component.css']
})
export class AvailableLnComponent implements OnInit {

  private ls: Ln[] = [];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getAvailableLs();
  }

  getAvailableLs() {
    //TODO add interceptor with {withCredentials: true}
    this.httpClient.get('http://localhost:8080/api/availableLs').subscribe((data) => {
      this.ls = data['content'];
    });
  }

  invest(id: number) {
    this.httpClient.post('http://localhost:8080/api/ivst/' + id, null).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('POST call in error', response);
        alert('failed to invest in ln: ' + response.error.message);
      }
    );
  }

}

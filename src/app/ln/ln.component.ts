import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Pm} from '../pm';

@Component({
  selector: 'app-ln',
  templateUrl: './ln.component.html',
  styleUrls: ['./ln.component.css']
})
export class LnComponent implements OnInit {

  private lnId: number;
  private ps: Pm[] = [];
  private showForm: boolean;
  newPm: Pm;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.showForm = false;
    this.newPm = new Pm();
    this.route.params.subscribe(params => {
      this.lnId = params['lnId'];
      this.httpClient.get('http://localhost:8080/api/ln/' + this.lnId + '/pm')
        .subscribe((data: Pm[]) => {
          this.ps = data['content'];
          console.log(this.ps);
        });
    });
  }

  showNewPmForm() {
    return this.showForm;
  }

  addNewPm() {
    this.httpClient.post('http://localhost:8080/api/ln/' + this.lnId + '/pm', this.newPm)
      .subscribe(
        (val) => {
          console.log('POST call successful');
          this.ngOnInit();
        },
        (response) => {
          console.log('POST call in error', response);
        }
      );
  }

  deletePm(id: number) {
    this.httpClient.delete('http://localhost:8080/api/ln/' + this.lnId + '/pm/' + id)
      .subscribe(
        (val) => {
          this.ngOnInit();
        },
        (response) => {
          console.log('DELETE call in error', response);
        }
      );
  }

  toggleForm() {
    this.showForm = true;
  }

}

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
  private ps: Pm[];
  private showNewPmForm: boolean;
  private newPm: Pm;
  private editPmId: number;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.editPmId = null;
    this.showNewPmForm = false;
    this.newPm = new Pm();
    this.route.params.subscribe(params => {
      this.lnId = params['lnId'];
      this.getPs();
    });
  }

  getPs() {
    this.httpClient.get('http://localhost:8080/api/ln/' + this.lnId + '/pm')
      .subscribe((data: Pm[]) => {
        this.ps = data['content'];
      });
  }

  createPm() {
    this.httpClient.post('http://localhost:8080/api/ln/' + this.lnId + '/pm', this.newPm)
      .subscribe(
        (val) => {
          this.ngOnInit();
        },
        (response) => {
          console.log('POST call in error', response);
        }
      );
  }

  updatePm(pm: Pm) {
    this.httpClient.put('http://localhost:8080/api/ln/' + this.lnId + '/pm/' + pm.id, pm).subscribe(
      (val) => {
        this.ngOnInit();
      },
      (response) => {
        console.log('PUT call in error', response);
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

  toggleCreateForm() {
    this.showNewPmForm = true;
  }

  toggleUpdateForm(id: number) {
    this.editPmId = id;
  }

}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html'
})
export class CustomerMainComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }
}

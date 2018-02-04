import { Component, OnInit } from '@angular/core';
import { Car } from './../shared/car.model';
import { Review } from './../shared/review.model';
import { ApiService } from './../shared/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review-list-approval',
  templateUrl: './review-list-approval.component.html',
  styleUrls: ['./review-list-approval.component.scss']
})
export class ReviewListApprovalComponent implements OnInit {

  //@ViewChild(HomeComponent) homeComponent: HomeComponent;
  
  loading: Boolean = false;
  showSearch: Boolean = true;
  cars: Car[];
  models: String[];
  reviews: Review[];
  car: Car;
  modelHeader: any;
  makeHeader: any;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('approvals')
      .subscribe(data => this.reviews = data);
  }

}

import { Car } from './../shared/car.model';
import { Review } from './../shared/review.model';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  reviews: Review[];
  car = "Captiva";

  constructor(public api: ApiService) { }

  ngOnInit() {
    /* this.api.get('reviews')
      .subscribe(data => this.reviews = data);  */
    this.api.getReview('reviews', this.car)
      .subscribe(data => this.reviews = data);
  }

  getFilteredReviews(car) {
    this.api.getFiltered('reviews', this.car)
      .subscribe(data => this.reviews = data);
  }

}

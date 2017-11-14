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

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('reviews')
      .subscribe(data => this.reviews = data);
  }

}
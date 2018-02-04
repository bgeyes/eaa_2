import { ApiService } from './../shared/api.service';
import { Review } from './../shared/review.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-approval',
  templateUrl: './review-approval.component.html',
  styleUrls: ['./review-approval.component.scss']
})
export class ReviewApprovalComponent implements OnInit {

  @Input() review: Review;
  newReview: Review;

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  aproba() {
    console.log("copiere...");
    this.api.post('reviews', this.review)
      .subscribe(data => {
        this.newReview = data;
      });
      console.log("copiat. stergere...");
    this.api.delete('approval', this.review)
      .subscribe(data => {
        this.newReview = data;
      });
      console.log("sters");
  };

  sterge() {
    this.api.delete('approval', this.review)
      .subscribe(data => {
        this.newReview = data;
        console.log("sters");
    });
  };

}

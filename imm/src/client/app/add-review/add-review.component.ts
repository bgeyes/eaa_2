import { NgForm } from '@angular/forms';
import { ApiService } from './../shared/api.service';
import { Review } from './../shared/review.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  loading: Boolean = false;
  newReview: Review;

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);

    const review: Review = {
      name: formValues.name,
      make:  formValues.make,
      model: formValues.model,
      version: formValues.version,
      yearOfReg: formValues.yor,
      avgMlg: formValues.avgMlg,
      typicalMpg: formValues.typicalMpg,
      ownershipPeriod: formValues.ownershipPeriod,
      stateAtPurchase: formValues.stateAtPurchase,
      usage: formValues.usage,
      review: formValues.review,
      recommend: formValues.recommend,
      rating: formValues.rating,
      commonProblems: formValues.commonProblems,
      location: formValues.location
    };

    this.api.post('reviews', review)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newReview = data;
      });
  }

}

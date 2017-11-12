import { NgForm } from '@angular/forms';
import { ApiService } from './../shared/api.service';
import { Review } from './../shared/review.model';
import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../shared/car.model';
import { OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent } from 'angular-star-rating';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  loading: Boolean = false;
  newReview: Review;
  cars: Car[];
  models: String[];
  rating: any;
  getCurrentUser: any;

  //star rating 
  onClickResult:OnClickEvent;
  onHoverRatingChangeResult:OnHoverRatingChangeEvent;
  onRatingChangeResult:OnRatingChangeEven;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('cars')
      .subscribe(data => this.cars = data);
    this.getCurrentUser = this.api.get('authenticate/profile.json');
    console.log(this.getCurrentUser);
  };

  //star rating
  onClick = ($event:OnClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
  };

  /* onRatingChange = ($event:OnRatingChangeEven) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
  };

  onHoverRatingChange = ($event:OnHoverRatingChangeEvent) => {
    console.log('onHoverRatingChange $event: ', $event);
    this.onHoverRatingChangeResult = $event;
  }; */

  onChange(make) {
    if (make == '0') {
      return this.models = []
    }
    var i;
    for (i in this.cars) {
      if (this.cars[i].make == make){
        this.models = this.cars[i].model;
      };
    };
  };

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
      rating: this.onClickResult.rating,
      commonProblems: formValues.commonProblems,
      location: formValues.location
    };

    this.api.post('reviews', review)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newReview = data;
      });
  };

}

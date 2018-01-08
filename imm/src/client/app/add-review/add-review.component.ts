import { AuthService } from './../shared/auth.service';
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
  currentUser: string;
  additionalInfo: Boolean = false;
  selected: String[];
  rate: any;
  isActive = false;
  isActive2 = false;

  

  //star rating 
  onClickResult:OnClickEvent;
  onHoverRatingChangeResult:OnHoverRatingChangeEvent;
  onRatingChangeResult:OnRatingChangeEven;

  constructor(public api: ApiService, public auth: AuthService) { }

  ngOnInit() {
    this.api.get('cars')
      .subscribe(data => this.cars = data);
    this.currentUser = this.auth.getUser();
  };

  //star rating
  onClick = ($event:OnClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
  };

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

  addInfo() {
    this.additionalInfo = !this.additionalInfo;
    console.log(this.additionalInfo);
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);

    const review: Review = {
      name: this.currentUser,
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
      commonProblems: formValues.isActive,
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

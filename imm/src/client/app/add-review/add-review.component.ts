import { AuthService } from './../shared/auth.service';
import { NgForm } from '@angular/forms';
import { ApiService } from './../shared/api.service';
import { Review } from './../shared/review.model';
import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../shared/car.model';
import { OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent } from 'angular-star-rating';
import { fail } from 'assert';


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
  frane = false;
  parteaElectrica = false;
  motor = false;
  cutieViteze = false;
  suspensie = false;
  directie = false;
  commProbl = {};
  recommend: Boolean = true;

  commonProblems = {
        "frane": true,
        "parteaElectrica": true
  };

  

  //star rating 
  onClickResult:OnClickEvent;
  performanta:OnClickEvent;
  fiabilitate:OnClickEvent;
  costuri:OnClickEvent;
  onHoverRatingChangeResult:OnHoverRatingChangeEvent;
  onRatingChangeResult:OnRatingChangeEven;

  constructor(public api: ApiService, public auth: AuthService) { }

  ngOnInit() {
    this.api.get('cars')
      .subscribe(data => this.cars = data);
    this.currentUser = this.auth.getUser();
    console.log(this.commonProblems.frane);
  };

  //star rating
  onClick = ($event:OnClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
  };

  performance = ($event:OnClickEvent) => {
    console.log('performance $event: ', $event);
    this.performanta = $event;
  };

  reliability = ($event:OnClickEvent) => {
    console.log('reliability $event: ', $event);
    this.fiabilitate = $event;
  };

  costs = ($event:OnClickEvent) => {
    console.log('costs $event: ', $event);
    this.costuri = $event;
  };

  //make and model dropdown menu
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

  thumbsUp() {
    this.recommend = !this.recommend;
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    this.frane ? this.commProbl["frane"] = true : this.commProbl;
    this.parteaElectrica ? this.commProbl["parteaElectrica"] = true : this.commProbl;
    this.motor ? this.commProbl["motor"] = true : this.commProbl;
    this.cutieViteze ? this.commProbl["cutieViteze"] = true : this.commProbl;
    this.suspensie ? this.commProbl["suspensie"] = true : this.commProbl;
    this.directie ? this.commProbl["directie"] = true : this.commProbl;

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
      recommend: this.recommend,
      rating: this.onClickResult.rating,
      commonProblems: this.commProbl,
      location: formValues.location,
      performanta: this.performanta.rating,
      fiabilitate: this.fiabilitate.rating,
      costuri: this.costuri.rating,
      performantaText: formValues.performanta,
      fiabilitateText: formValues.fiabilitate,
      costuriText: formValues.costuri
    };
    
    this.api.post('reviews', review)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newReview = data;
      });
  };

}

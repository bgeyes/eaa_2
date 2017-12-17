import { HomeComponent } from './../home/home.component';
import { Car } from './../shared/car.model';
import { Review } from './../shared/review.model';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core/src/metadata/di';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  //@ViewChild(HomeComponent) homeComponent: HomeComponent;
  
  loading: Boolean = false;
  showSearch: Boolean = true;
  cars: Car[];
  models: String[];
  reviews: Review[];
<<<<<<< HEAD
  car: Car;
=======
  car = "Captiva";
>>>>>>> master

  constructor(public api: ApiService) { }

  ngOnInit() {
<<<<<<< HEAD
    this.api.get('cars')
      .subscribe(data => this.cars = data);
    /* this.api.get('reviews')
      .subscribe(data => this.reviews = data); */
  }

  getFilteredReviews(form: NgForm) {
    const formValues = Object.assign({}, form.value);
    this.car = {
      make: formValues.make,
      model: formValues.model
    };

    let model: any = this.car.model;
    this.api.getFiltered('reviews', model)
      .subscribe(data => {
        form.reset();
        this.showSearch = false;
        this.reviews = data});
=======
    /* this.api.get('reviews')
      .subscribe(data => this.reviews = data);  */
    this.api.getReview('reviews', this.car)
      .subscribe(data => this.reviews = data);
  }

  getFilteredReviews(car) {
    this.api.getFiltered('reviews', this.car)
      .subscribe(data => this.reviews = data);
>>>>>>> master
  }

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

}

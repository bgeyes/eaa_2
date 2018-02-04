import { Car } from './../shared/car.model';
import { Review } from './../shared/review.model';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  
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
    this.api.get('cars')
      .subscribe(data => this.cars = data);
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
        this.reviews = data;
        console.log(this.reviews[0].make);
        this.modelHeader = this.reviews[0].model;
        this.makeHeader = this.reviews[0].make;});
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
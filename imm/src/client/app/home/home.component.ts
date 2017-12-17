import { Car } from './../shared/car.model';
import { ApiService } from './../shared/api.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading: Boolean = false;
  car: Car = { make: '', model: ['']};
  cars: Car[];
  models: String[];
  @Output() searchFilterEvent = new EventEmitter();


  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('cars')
      .subscribe(data => this.cars = data);
  }

  onSubmit(form: NgForm) {
    console.log("submitting...");
    const formValues = Object.assign({}, form.value);

    const car: Car = {
      make: formValues.make,
      model: formValues.model
    };

    console.log(car);

    this.searchFilterEvent.emit(car);
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

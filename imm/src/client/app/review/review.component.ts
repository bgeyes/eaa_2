import { Review } from './../shared/review.model';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;

  constructor() { }

  ngOnInit() {
  }

}

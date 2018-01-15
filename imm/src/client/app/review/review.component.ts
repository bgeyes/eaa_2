import { Review } from './../shared/review.model';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  rev = {
    "_id": {
        "$oid": "5a5741eeb035e062202d1a61"
    },
    "name": "admin",
    "make": "Alfa Romeo",
    "model": "Alfa 146",
    "version": "2.0 ",
    "yearOfReg": "2006",
    "avgMlg": "10000 - 15000 km/an",
    "typicalMpg": 10,
    "ownershipPeriod": "1-2 years",
    "stateAtPurchase": "Utilizat",
    "usage": "distante medii",
    "review": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget c",
    "recommend": true,
    "rating": 4,
    "commonProblems": {
        "frane": true,
        "suspensie": true
    },
    "location": "Arad",
    "performanta": 4,
    "fiabilitate": 4,
    "costuri": 3,
    "performantaText": "perfromanata dfa sdf",
    "fiabilitateText": "fiabilitate asda",
    "costuriText": "costrurioifs"
  }

  @Input() review: Review;

  @HostBinding('class') columnClass = 'fourteen wide column';

  constructor() { }

  ngOnInit() {
  }

}

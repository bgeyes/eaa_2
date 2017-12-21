import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  setStyle: false;
  
  constructor() {
  }
  
  getStyle() {
    if(this.setStyle) {
      return "yellow";
    } else {
      return "";
    }
  }
}

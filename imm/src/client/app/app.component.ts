import { AuthService } from './shared/auth.service';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(public auth: AuthService) {
  }

  logout() {
    this.auth.logout();
  }

  setStyle() {

  }
}

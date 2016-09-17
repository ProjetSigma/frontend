import { Component } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ APIService, AuthService ]
})
export class AppComponent {
    constructor(public api:APIService) {}
}

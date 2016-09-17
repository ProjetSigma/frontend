import { Component } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ APIService, AuthService ]
})
export class AppComponent {
    constructor(public api:APIService) {}
}

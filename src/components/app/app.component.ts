import { Component } from '@angular/core';
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ APIService ]
})
export class AppComponent {
}

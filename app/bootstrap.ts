import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './components/app/app';
import {AuthService} from './services/auth-service';
import {RestService} from './services/rest.service';
import 'rxjs/Rx';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService, RestService,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);

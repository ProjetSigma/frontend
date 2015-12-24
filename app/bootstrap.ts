import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './components/app/app';
import {AuthService} from './services/users/auth-service';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);

import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app/app';
import {AuthService} from './shared/services/auth-service';
import {APIService} from './shared/services/api-service';
import 'rxjs/Rx';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService, APIService,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);

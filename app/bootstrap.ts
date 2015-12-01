import {bootstrap} from 'angular2/angular2';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './components/app/app';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS, HTTP_PROVIDERS
]);

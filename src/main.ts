import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app/app';
import {AuthService} from './shared/services/auth-service';
import {RestService} from './shared/services/rest-service';
import {APIService} from './shared/services/api-service';

import {utils as JSDataUtils} from 'js-data';

Object.defineProperty(
    JSDataUtils.Promise.prototype,
    'subscribe',
    {
        value: function (onNext: (any) => (any), onError: (any) => (any), onComplete: () => (any)) {
            return this.then(function (result) {
                setTimeout(function () {
                    onNext(result);
                }, 0);
                setTimeout(function () {
                    onComplete();
                }, 0);
            }, onError);
        }
    }
);

bootstrap(AppComponent, [
  ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService, RestService, APIService,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);

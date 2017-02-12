import { Injectable, Component } from '@angular/core';

import {DataStore} from 'js-data';
import {HttpAdapter, addActions} from 'js-data-http';

import {AuthService} from './auth.service';
import {api_url} from '../config';

import {User, userMapper, userActions} from '../resources/user';
import {groupMapper} from '../resources/group';
import {groupFieldMapper} from '../resources/group-field';
import {groupFieldValueMapper} from '../resources/group-field-value';
import {membershipMapper} from '../resources/membership';

import {Membership, membershipSchema, membershipRelations} from '../resources/membership';

@Injectable()
export class APIService {

    protected base_url: string = api_url;
    protected httpAdapter: HttpAdapter;
    
    public store: DataStore = new DataStore();
    public me: User = new User();

    
    constructor(private auth: AuthService) {
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token()
        };
        this.httpAdapter = new HttpAdapter({ basePath: this.base_url, httpConfig: { headers: headers }, forceTrailingSlash: true });

        // Create store
        this.store.registerAdapter('http', this.httpAdapter, { default: true });

        this.store.defineMapper('user', userMapper);
        this.store.defineMapper('group', groupMapper);
        this.store.defineMapper('group-field', groupFieldMapper);
        this.store.defineMapper('group-field-value', groupFieldValueMapper);
        this.store.defineMapper('membership', membershipMapper);

        // this.initializeStore();
    }

    initializeStore() {
        (addActions(userActions)(this.store.getMapper('user'))).me()
        .then(res =>  {
            this.me = res;
            this.getMyGroups();
        });
    }

      
      //Me-related methods

      //Retrieves all the groups of the logged user and attach them to the User
      //object.
      getMyGroups() {
          this.store.findAll('membership',{'user':this.me.id}).then(res => {
              this.me.memberships = res;
              for (var membership of this.me.memberships) {
                  this.store.find('group',membership.group_id).then(res => {
                      membership.group = res;
                  });
              };
          });
      }

      getMyMembership(group_id:number) {
          if(this.me.memberships) {
              for (var membership of this.me.memberships) {
                  if (membership.group_id === group_id)
                      return membership;
              }
              return undefined;
          } else {
              return undefined;
          }
      }

      //Returns true if the user is member of the argument group.
      isInMyGroups(group_id:number) {
          if (this.me.memberships) {
              for (var membership of this.me.memberships) {
                  if (membership.group_id === group_id)
                      return true;
              }
              return false;
          } else {
              return false;
          }
      }

}

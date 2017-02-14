import {Injectable} from '@angular/core';

import {DataStore} from 'js-data';
import {APIAdapterService} from './adapter.service'

import {acknowledgmentMapper}           from '../resources/acknowledgment';
import {acknowledgmentInvitationMapper} from '../resources/acknowledgment-invitation';
import {groupMapper}                    from '../resources/group';
import {groupFieldMapper}               from '../resources/group-field';
import {groupFieldValueMapper}          from '../resources/group-field-value';
import {membershipMapper}               from '../resources/membership';
import {groupInvitationMapper}          from '../resources/group-invitation';

import {User, userMapper, userActions} from '../resources/user';


@Injectable()
export class APIService {
    
    public store: DataStore = new DataStore();
    public me: User = new User();

    
    constructor(protected adapter: APIAdapterService) {
        this.store.registerAdapter('http', this.adapter, { default: true });

        this.store.defineMapper('acknowledgment', acknowledgmentMapper);
        this.store.defineMapper('acknowledgment-invitation', acknowledgmentInvitationMapper);
        this.store.defineMapper('user', userMapper);
        this.store.defineMapper('group', groupMapper);
        this.store.defineMapper('group-field', groupFieldMapper);
        this.store.defineMapper('group-field-value', groupFieldValueMapper);
        this.store.defineMapper('membership', membershipMapper);
        this.store.defineMapper('group-invitation', groupInvitationMapper);
    }

    initializeStore() {
        // (addActions(userActions)(this.store.getMapper('user'))).me()
        // .then(res =>  {
            // this.me = res;
            // this.getMyGroups();
        // });
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

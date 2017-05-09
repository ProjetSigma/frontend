import {Component} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from 'services/api.service';
import {Group} from 'resources/group';

@Component({
    templateUrl: 'pinned-groups.component.html',
    selector: 'pinned-groups'
})

export class PinnedGroupsComponent {
    public pinnedGroups: Group[] = [];

    constructor(public api: APIService) {
        this.api.store.find('group').then(g => {
          var i = 0;
          var nbGroups = 5;
          g.forEach((grp) => {
            if (i < nbGroups){
              this.pinnedGroups.push(grp);
            }
            i ++;            
          });
        });
    };

}

import {Component,Input} from 'angular2/core';
import {NgFor, NgIf, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';

import {Group} from '../../../../services/groups/group';
import {GroupService} from '../../../../services/groups/group-service';

@Component({
    selector: 'group-display',
    templateUrl: './components/groups/group-details/group-display/group-display.html',
    directives: [NgFor, NgIf, NgSwitch, NgSwitchWhen, NgSwitchDefault],
    providers: [GroupService]
})
export class GroupDisplayComponent {
    @Input('group') group: Group;
    private resp_school: Group = new Group();

    constructor(public group_service:GroupService) {};

    ngOnChanges() {
      if (this.group.resp_school != undefined) {
          this.getResp_school(String(this.group.resp_school));
      }
    };

    getResp_school(id: string) {
        this.group_service.getGroup(id)
            .subscribe(res => this.resp_school = res.json());
    }
}

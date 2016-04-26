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
    private resp_group: Group = new Group();

    constructor(public group_service:GroupService) {};

    ngOnChanges() {
      if (this.group.resp_group !== undefined) {
          this.getResp_group(String(this.group.resp_group));
      }
    };

    getResp_group(id: string) {
        this.group_service.getGroup(id)
            .subscribe(res => this.resp_group = res.json());
    }


}

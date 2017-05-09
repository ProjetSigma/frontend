import {Component, Input} from '@angular/core';

import {Group} from '../../../../../resources/group';

@Component({
    selector: 'postform',
    templateUrl: 'postform.component.html'
})
export class PostFormComponent {
    @Input('group') group: Group;
    public title: string;
    public content: string;

    constructor() {}


    post() {
      
    }
}

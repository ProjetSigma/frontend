import {Component, Input} from '@angular/core';

import {Group} from '../../../../../resources/group';
import {APIService} from 'services/api.service';

@Component({
    selector: 'postform',
    templateUrl: 'postform.component.html'
})
export class PostFormComponent {
    @Input('group') group: Group;
    public title: string;
    public content: string;

    constructor(public api: APIService) {

    }


    post() {
      this.api.store.action('publication', undefined, undefined, 'publication', {"title":this.title, "content":this.content, "author":1});
    }
}

import {Component} from '@angular/core';
import {GroupProvider} from '../group.component';
import {Group} from 'resources/group';
import {PostFormComponent} from './postform/postform.component';

@Component({
    templateUrl: 'group-publications.component.html',
})
export class GroupPublicationsComponent {
    public group: Group;

    constructor(public grPr: GroupProvider) {
        this.grPr.group.subscribe(
            (gr: Group) => { this.group = gr; }
        );
    }
}

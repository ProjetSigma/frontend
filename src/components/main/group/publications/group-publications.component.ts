import {Component} from '@angular/core';

import {APIService} from 'services/api.service';
import {GroupProvider} from '../group.component';
import {Group} from 'resources/group';
import {Publication} from 'resources/publication';
import {PostFormComponent} from './postform/postform.component';
import {PublicationComponent} from './publication/publication.component';


@Component({
    templateUrl: 'group-publications.component.html',
})
export class GroupPublicationsComponent {
    public group: Group;
    public publications: Publication[] = [];

    constructor(public grPr: GroupProvider, public api: APIService) {
        this.grPr.group.subscribe(
            (gr: Group) => {
                this.group = gr;
                this.api.store.find('group', this.group.pk, 'publications').then(p => {
                    p.forEach((obj) => { console.log("log");console.log(p);this.publications.push(obj);});
                });
            }
        );
    }
}

import {Component, OnInit} from '@angular/core';
import {GroupProvider} from '../group.component';
import {Group} from 'resources/group';
import {PostFormComponent} from './postform/postform.component';

import {APIService} from '../../../../services/api.service';

@Component({
    templateUrl: 'group-publications.component.html',
})
export class GroupPublicationsComponent implements OnInit{
    public group: Group;
    public loaded = false;

    constructor(public grPr: GroupProvider, public api: APIService) {
        this.grPr.group.subscribe(
            (gr: Group) => { this.group = gr; }
        );
    }

    ngOnInit() {
      this.api.store.find("group", this.group.pk, "publications").then((response)=>{
        this.group.publications = response;
        this.loaded = true;
      });
    }
}

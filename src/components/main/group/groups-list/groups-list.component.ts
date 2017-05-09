import {Component} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../../services/api.service';
import {GroupInlineDisplayComponent} from '../group-details/group-inline-display/group-inline-display.component';
import {Group} from '../../../../resources/group';
import {Levenshtein} from '../../../../utils/levenshtein';


@Component({
    templateUrl: 'groups-list.component.html'
})
export class GroupsListComponent {
    public allGroups;
    public displayedGroups;
    public searchGroup = '';
    public timeouter;

    constructor(public api: APIService) {
        this.allGroups = [];
        this.displayedGroups = [];
        this.initGroups();
        this.searchGroup = '';
    };

    initGroups() {
        this.api.store.find('group').then(res => {
            this.allGroups = res;
            this.updateGroups([]);
        });
    }

    updateSearchBar(searchBar) {
        let q = searchBar.target.value;
        if (q.trim() === '') {
            return;
        }
        q = q.toLowerCase().split(' ');

        this.updateGroups(q);
    }

    updateGroups(q) {
        clearTimeout(this.timeouter);
        this.timeouter = setTimeout(() => this.getGroups(q),400);

        //this.showGroups(q);
    }

    getGroups(q) {
        this.api.store.action('search',undefined,'groups',"group",{word:q.join(' ')}).then(res => {
            this.allGroups = res;
            this.showGroups(q);
        });
    }

    showGroups(q) {
        var preScores = Array(this.allGroups.length);
        this.displayedGroups = Array(this.allGroups.length);
        var curMax = -1;
        var i = 0;

        this.allGroups.forEach((obj)=>{
            var score = Levenshtein.compare_string_arrays(obj.name.toLowerCase().split(' '),q);
            preScores[i] = score;
            if(score > curMax){
                curMax = score;
            }
            i++;
        });

        i=0;
        this.allGroups.forEach((obj)=>{
            preScores[i] /= curMax;
            this.displayedGroups[i] = {
                obj:obj,
                score:preScores[i]*3 + (1-obj.score)
            };

            i++;
        });
        

        this.displayedGroups.sort((a,b) => a.score-b.score);
    }
}

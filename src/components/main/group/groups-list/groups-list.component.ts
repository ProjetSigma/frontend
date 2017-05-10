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
    protected allGroups;
    protected blackList;
    public displayedGroups;
    protected searchGroup = '';
    protected searchBar;
    protected timeouter;

    constructor(public api: APIService) {
        this.allGroups = [];
        this.displayedGroups = [];
        this.initGroups();
        this.searchGroup = '';
    };

    initGroups() {
        this.api.store.find('group').then(res => {
            this.allGroups = res;
            this.showDefault();
        });
    }

    updateSearchBar(searchBar) {
        let q = searchBar.target.value;
        if (q.trim() === '') {
            return;
        }
        let value = q.toLowerCase().split(' ');
        this.updateGroups(value);
    }

    updateGroups(value){
        clearTimeout(this.timeouter);
        this.timeouter = setTimeout(() => this.getGroups(value),400);
    }

    getGroups(q) {
        this.api.store.action('search',undefined,'groups',"group",{word:q.join(' ')}).then(res => {
            this.allGroups = res;
            this.showGroups(q);
        });
    }

    showDefault() {
        var i = 0;
        this.allGroups.forEach((obj)=>{
            this.displayedGroups[i] = {
                obj:obj,
                score:0
            };
            i++;
        });
    }

    showGroups(q) {
        if(q.length == 0){
            this.showDefault();
        }

        var filteredGroups = this.allGroups.filter((group) => {
            for(var index = 0; index<this.blackList.length; index++){
                if (this.blackList[index]==group) {
                    return false;
                }
            }
            return true;
        });


        var preScores = Array(filteredGroups);
        this.displayedGroups = Array(filteredGroups);
        var curMax = -1;
        var i = 0;

        filteredGroups.forEach((obj)=>{
            var score = Levenshtein.compare_string_arrays(obj.name.toLowerCase().split(' '),q);
            preScores[i] = score;
            if(score > curMax){
                curMax = score;
            }
            i++;
        });

        i=0;
        filteredGroups.forEach((obj)=>{
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

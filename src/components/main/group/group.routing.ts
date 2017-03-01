import {GroupComponent, GroupResolver} from './group.component';
import {GroupPublicationsComponent} from './publications/group-publications.component';
import {GroupMembersComponent} from './members/group-members.component';
import {Route} from '@angular/router';

export const GroupRoute: Route = {
    path: 'group/:group_id',
    component: GroupComponent,
    resolve: { 'group' : GroupResolver },
    children: [
        {path: '', component: GroupPublicationsComponent},
        {path: 'publications', component: GroupPublicationsComponent},
        {path: 'members', component: GroupMembersComponent}
    ]
};

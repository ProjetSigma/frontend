import {GroupComponent, GroupResolver} from './group.component';
import {GroupPublicationsComponent} from './publications/group-publications.component';
import {GroupMembersComponent} from './members/group-members.component';
import {ChatComponent} from '../../chat/chat.component';
import {Route} from '@angular/router';

export const GroupRoute: Route = {
    path: 'group/:group_id',
    component: GroupComponent,
    resolve: { 'group' : GroupResolver },
    children: [
        {path: '', component: GroupPublicationsComponent},
        {path: 'chat', component: ChatComponent},
        {path: 'publications', component: GroupPublicationsComponent},
        {path: 'members', component: GroupMembersComponent}
    ]
};

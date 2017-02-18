import {GroupComponent, GroupResolver} from './group.component';
import {GroupRoutingComponents} from './group.routing';

import {GroupPublicationsComponent} from './publications/group-publications.component';
import {GroupMembersComponent} from './members/group-members.component';


export const GroupDeclarations = [
    GroupComponent,
    ...GroupRoutingComponents.components,
    
    GroupPublicationsComponent,
    GroupMembersComponent
]

export const GroupProviders = [
    GroupResolver
]

export const GroupRoute = {
    path: 'group/:group_id',
    component: GroupComponent,
    children: GroupRoutingComponents.routes,
    resolve: { 'group' : GroupResolver }
}
import {GroupComponent, GroupResolver} from './group.component';
import {GroupPublicationsComponent} from './publications/group-publications.component';
import {GroupMembersComponent} from './members/group-members.component';

import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupInlineDisplayComponent } from './group-details/group-inline-display/group-inline-display.component';


export const GroupDeclarations = [
    GroupComponent,
    GroupPublicationsComponent,
    GroupMembersComponent,
    GroupsListComponent,
    GroupInlineDisplayComponent
];

export const GroupProviders = [
    GroupResolver
];

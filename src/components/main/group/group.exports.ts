import {GroupComponent, GroupResolver} from './group.component';
import {GroupPublicationsComponent} from './publications/group-publications.component';
import {GroupMembersComponent} from './members/group-members.component';


export const GroupDeclarations = [
    GroupComponent,
    GroupPublicationsComponent,
    GroupMembersComponent
]

export const GroupProviders = [
    GroupResolver
]
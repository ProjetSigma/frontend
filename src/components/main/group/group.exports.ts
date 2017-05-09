import {GroupComponent, GroupResolver} from './group.component';
import {GroupPublicationsComponent} from './publications/group-publications.component';
import {PostFormComponent} from './publications/postform/postform.component';
import {GroupMembersComponent} from './members/group-members.component';
import {PublicationComponent} from './publications/publication/publication.component';
import {GroupSettingsComponent} from './settings/group-settings.component';

import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupInlineDisplayComponent } from './group-details/group-inline-display/group-inline-display.component';


export const GroupDeclarations = [
    GroupComponent,
    GroupPublicationsComponent,
    PostFormComponent,
    GroupMembersComponent,
    GroupsListComponent,
    GroupInlineDisplayComponent,
    PublicationComponent,
    GroupSettingsComponent,
];

export const GroupProviders = [
    GroupResolver
];

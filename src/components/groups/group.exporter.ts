import {GroupComponent, GroupRoutes, GroupResolver, GroupRoutesComponents} from './group.component';

import {GroupPublicationsComponent} from './publications/group-publications.component';



export const GroupRoute = {
    path: 'group/:group_id',
    component: GroupComponent,
    children: GroupRoutes,
    resolve: { 'group' : GroupResolver }
}

export const GroupDeclarations = [
    GroupComponent,
    ...GroupRoutesComponents,
    
    GroupPublicationsComponent
]

export const GroupProviders = [
    GroupResolver
]
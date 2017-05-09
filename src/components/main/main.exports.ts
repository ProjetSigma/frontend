import {MainComponent} from './main.component';
import {Error404Component} from './404/error404.component';
import {HomeComponent} from './home/home.component';
import {AgendaComponent } from './agenda/agenda.component';

import {GroupDeclarations, GroupProviders} from './group/group.exports';
import {UserDeclarations, UserProviders} from './user/user.exports';
import {EventDeclarations, EventProviders} from './event/event.exports';


export const MainDeclarations = [
    MainComponent,
    Error404Component,
    HomeComponent,
    AgendaComponent,

    ...UserDeclarations,
    ...GroupDeclarations,
    ...EventDeclarations,
]

export const MainProviders = [
    ...UserProviders,
    ...GroupProviders,
    ...EventProviders,
]

import {MainComponent} from './main.component';
import {Error404Component} from './404/error404.component';
import {HomeComponent} from './home/home.component';

import {GroupDeclarations, GroupProviders} from './group/group.exports';
import {UserDeclarations, UserProviders} from './user/user.exports';


export const MainDeclarations = [
    MainComponent,
    Error404Component,
    HomeComponent,
    
    ...UserDeclarations,
    ...GroupDeclarations
]

export const MainProviders = [
    ...UserProviders,
    ...GroupProviders
]
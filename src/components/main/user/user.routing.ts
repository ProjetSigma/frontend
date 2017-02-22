import {UserComponent, UserResolver} from './user.component';
import {Route}   from '@angular/router';

export const UserRoute : Route = {
    path: 'user/:user_id',
    component: UserComponent,
    resolve: { 'user' : UserResolver }
}
import {Component} from '@angular/core';
import {Router}   from '@angular/router';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent {

    public message: string;

    constructor(private router: Router) {}

}

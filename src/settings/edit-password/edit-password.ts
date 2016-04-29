import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {UserService} from '../../shared/services/users/user-service';


@Component({
    selector: 'edit-password',
    templateUrl: './settings/edit-password/edit-password.html',
    providers: [UserService],
    directives: [NgForm]
})
export class EditPasswordComponent {
    public onSuccess:boolean = false;
    public actualPassword:string;
    public newPassword:string;

    constructor(public user_service:UserService) {
    }

    editPassword(actualPassword:string, newPassword:string) {
        this.onSuccess = false;
        this.user_service.editPassword(actualPassword, newPassword).subscribe(
            () => {
                this.actualPassword = '';
                this.newPassword = '';
                this.onSuccess = true;
            },
            res => {
                if (res.status === 403) { // wrong actualPassword
                    this.actualPassword = '';
                } else {
                    this.newPassword = '';
                }
            }
        );
    }
}

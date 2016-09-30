import {Component} from '@angular/core';

import {APIService} from '../../../services/api.service';


@Component({
    selector: 'edit-password',
    templateUrl: 'edit-password.component.html'
})
export class EditPasswordComponent {
    public onSuccess:boolean = false;
    public actualPassword:string;
    public newPassword:string;

    constructor(public api: APIService) {
    }

    editPassword(actualPassword:string, newPassword:string) {
        this.onSuccess = false;
        this.api.store.getAdapter('http').PUT(
            'http://127.0.0.1:8000/user/change_password/',
            {old_password: actualPassword, password: newPassword}
        ).then(
            () => {
                this.actualPassword = '';
                this.newPassword = '';
                this.onSuccess = true;
            },
            res => {
                console.log(res);
                if (res.status === 403) { // wrong actualPassword
                    this.actualPassword = '';
                } else {
                    this.newPassword = '';
                }
            }
        );
    }
}

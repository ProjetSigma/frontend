export class User {
    public id:string;
    public last_login:Date;
    public memberships;
    public email:string;
    public lastname:string;
    public firstname:string;
    public phone:string;
    public is_active:string;
    public last_modified:Date;
    public join_date:Date;

    constructor() {
        this.last_login = new Date();
        this.last_modified = new Date();
        this.join_date = new Date();
    }
}

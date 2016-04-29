export class Membership {
    public id:number;
    public user:string;//id of user
    public group:string;//id of group
    public created:Date;
    public join_date:Date;
    public leave_date:Date;
    public perm_rank:number;

    constructor() {
        this.created = new Date();
        this.join_date = new Date();
        this.leave_date = new Date();
    }
}

export class Group {
    public id:number;
    public memberships:number[];//array of id of Memberships
    public name:string;
    public visibility:string;//public or privaye
    public type:string;//basic or cursus or association or school_promotion or school
    public default_member_rank:number;
    public req_rank_invite:number;
    public req_rank_kick:number;
    public req_rank_accept_join_requests:number;
    public req_rank_promote:number;
    public req_rank_demote:number;
    public req_rank_modify_group_infos:number;
}

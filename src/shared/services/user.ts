export class User {
    public id: number;
    public last_login: Date;
    public groups: any[]; // TODO: type Group[]
    public clusters: any[]; // TODO: type Cluster[]
    public photo;
    public email: string;
    public lastname: string;
    public firstname: string;
    public phone: string;
    public is_active: boolean;
    public last_modified: Date;
    public join_date: Date;

    constructor (props = {}) {
        for (var key in props) {
            if (props.hasOwnProperty(key)) {
                this[key] = props[key];
            }
        }
        this.last_login = new Date();
        this.last_modified = new Date();
        this.join_date = new Date();
    }
}

export const userActions = {
    'me': {
        adapter: 'http',
        pathname: 'me',
        response: (u) => { return new User(u.data); }
    }
};

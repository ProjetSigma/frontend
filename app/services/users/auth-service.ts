import {Component} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS,Headers} from 'angular2/http';

@Component({
    providers: [Http, HTTP_PROVIDERS]
})
export class AuthService {
    public token;
    public isConnected;
    private clientId = 'Bziiu7E0wFtNre6TLdSnEqIe73prHbjJsPx3p5rL';
    private clientSecret = '8QCDHhiwwAEA5RIwuta8SpprcoJPmpfIwhkPNZil8wJqeLuAh6BKsvWVxNkFvg5YgO0aFrsYngY7YK77iil9f4jRFNSBX11XCe0iGTUd0o9HKCvj72twl0qMT6hlJp3l';

    constructor(public http:Http) {
    }

    authentificate(username,password) {
        var request = 'grant_type=password&username='+username+'&password='+password;

        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(this.clientId+':'+this.clientSecret));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post('http://localhost:8000/o/token/',
            request,
            {headers:headers}
        )
        .subscribe(res => console.log(res));
    }

}

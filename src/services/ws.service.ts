import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Transaction, SigmaWebSocket} from '../utils/websocket';
import {ws_config} from '../config';

@Injectable()
export class WebSocketService {
    
    private ws: SigmaWebSocket;
    
    constructor(private auth: AuthService) {
        this.ws = new SigmaWebSocket(ws_config);
        
        this.ws.onopen = (ev:Event) => {
            this.checkForAuth();
        }
    }
    
    checkForAuth(): void {
        if(this.auth.is_authenticated()) {
            let tr: AuthenticationTransaction = new AuthenticationTransaction(this.ws);
            tr.send(this.auth.token());
        }
    }
    
    ready(): boolean {
        return this.ws.ready();
    }
    
    sendREST(params: RESTRequestParams) : Promise<any> {
        let tr: RESTTransaction = new RESTTransaction(this.ws);
        return tr.send(params);
    }
    
}

export class AuthenticationTransaction extends Transaction {
    constructor(ws: SigmaWebSocket) {super(ws);}
    
    send(token: string) : Promise<any> {
		return super._send({
			id: this.id,
			protocol: "SIGMA.0.1",
			action: "AUTH",
			token: token
		});
    }
}

interface RESTRequestParams { location: string; action: string; data?: any; id?: string|number; };
export class RESTTransaction extends Transaction {    
    constructor(ws: SigmaWebSocket) {super(ws);}
    
    send(params: RESTRequestParams) : Promise<any> {
        return new Promise((resolve, reject) => {
            super._send({
                id : this.id,
                protocol: "SIGMA.0.1",
                action: "REST_API",
                REST_action: params.action,
                REST_location: params.location,
                REST_data: ('data' in params ? params.data : undefined),
                REST_pk: ('id' in params ? params.id : undefined)
                
            }).then((res:any) => { // Treat rest errors
                if(res.code <= 10)
                    resolve(res.content);
                else
                    reject(Error(res));
            }, (err:any) => {
                reject(err);
            });
        });
    }
}
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Transaction, SigmaWebSocket} from '../utils/websocket';
import {ws_config} from '../config';

interface RESTRequestParams { location: string; action: string; data?: any; id?: string|number; params?: any };

@Injectable()
export class WebSocketService {

    private ws: SigmaWebSocket;

    constructor(private auth: AuthService) {
        this.ws = new SigmaWebSocket(ws_config);

        this.ws.onopen = (ev: Event) => {
            this.checkForAuth();
        };
    }

    checkForAuth(): void {
        if (this.auth.isAuthenticated()) {
            const tr: AuthenticationTransaction = new AuthenticationTransaction(this.ws);
            tr.send(this.auth.token());
        }
    }

    ready(): boolean {
        return this.ws.ready();
    }

    sendREST(params: RESTRequestParams): Promise<any> {
        const tr: Transaction = new Transaction(this.ws);
        return tr.send({
            id : tr.id,
            protocol: 'SIGMA.0.1',
            action: 'REST_API',
            REST_action: params.action,
            REST_location: params.location,
            REST_data: ('data' in params ? params.data : undefined),
            REST_qparams: ('params' in params ? params.params : undefined),
            REST_pk: ('id' in params ? params.id : undefined)

        }).then((res: any) => { // Treat rest errors
            if (res.code <= 10) {
                Promise.resolve(res.content);
            } else {
                Promise.reject(Error(res));
            }
        }, (err: any) => {
            Promise.reject(err);
        });
    }

}


export class AuthenticationTransaction extends Transaction {
    constructor(ws: SigmaWebSocket) { super(ws); }

    send(token: string): Promise<any> {
        return super.send({
            id: this.id,
            protocol: 'SIGMA.0.1',
            action: 'AUTH',
            token: token
        });
    }
}

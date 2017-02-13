import {Injectable} from '@angular/core';

import {ws_url} from '../config';

class Transaction {
    public id: number;
    
}

@Injectable()
class SigmaWebSocket {
    
	private transactions = {};
	private nextTransactionId:number = 0;
    private ws;
	
    constructor() {
        this.reconnect();
    }
    
	reconnect() {
		this.ws = new WebSocket(url);
		this.ws.onmessage = this.ws_onmessage;
		this.ws.onclose = this.ws_onclose;
		this.ws.onerror = this.ws_onerror;
	}
    
	send(msg) {
		msg = JSON.stringify(msg)
		this.ws.send(msg);
	}
    
	registerTransaction(transaction) {
		id = this.nextTransactionId;
		this.nextTransactionId += 1;
		
		transaction.id = id;
		this.transactions[id] = transaction
	}
	
	
	this.ws_onmessage = (function(self){
			return function(msg_event){
				msg = JSON.parse(msg_event.data);
			
				if(! 'id' in msg) { return; }
				if(msg.id < 0) { self.onevent(msg); return; }
				if(! msg.id in self.transactions) { return; }
				
				transaction = self.transactions[msg.id];
				transaction.onmessage(msg);
			}
		})(this);
	
	this.ws_onclose = (function(self){
		return function(){
			setTimeout(self.reconnect, 2000);
		}
	})(this);
	
	this.ws_onerror = (function(self){
		return function() {
			setTimeout(self.reconnect, 2000);
		}
	})(this);
	
	
	this.onevent = function(msg) {}
	
	this.reconnect();
	return this;
}


function AuthenticationTransaction(ws, token) {
	this.ws = ws;
	this.ws.registerTransaction(this);
	
	this.sendOriginalMessage = function() {
		message = {
			id: this.id,
			protocol: "SIGMA.0.1",
			action: "AUTH",
			token: token
		}
		this.ws.send(message);
	}
	
	return this;
}

function RESTTransaction(ws, loc, action, data="", pk=null) {
	this.ws = ws;
	this.ws.registerTransaction(this);
	
	this.sendOriginalMessage = function() {
		message = {
			id : this.id,
			protocol: "SIGMA.0.1",
			action: "REST_API",
			REST_action: action,
			REST_location: loc,
			REST_data: data,
		}
		if(pk != null) message.REST_pk = pk
		
		this.ws.send(message);
	}
	
	return this;
}
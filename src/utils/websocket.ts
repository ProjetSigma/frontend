class TaskQueue {
    private objs: any[] = [];
    private first: number = 0;
    private last: number = 0;
    
    newTask(): number { this.last += 1; this.objs[this.last -1] = null; return this.last-1; }
    waitFor(id:number, cb:(any)=>void): void { if(this.objs[id] == null) setTimeout(()=>{this.waitFor(id, cb);}, 5); else cb(this.objs[id]); }
    get(id: number): any { return this.objs[id]; }
    taskDone(resp: any): void { this.objs[this.first] = resp; this.first += 1; }
}

export class Transaction {
    id: number;
    ws: SigmaWebSocket;
    private respQueue: TaskQueue = new TaskQueue();
    
    constructor(ws: SigmaWebSocket) {
        this.ws = ws;
        this.ws.registerTransaction(this);
    }
    
    _send(msg: any) {
        let taskId = this.respQueue.newTask();
        return new Promise((resolve, reject) => {
            this.ws.send(msg);
            this.respQueue.waitFor(taskId, (resp) => {
                if(resp.code > 0) reject(Error(msg))
                else resolve(resp.response);
            });
        });
    }
    
    onmessage(resp: any): void {
        this.respQueue.taskDone(resp);
    }
};
interface TransactionList { [key: number]: Transaction; };


interface WebSocketParams {
    url: string;
    abortInterval: number;
    reconnectInterval: number;
}
export class SigmaWebSocket {
    
    private ws;
    private url: string;
    private abortInterval: number;
    private reconnectInterval: number;
    
	private transactions: TransactionList = {};
	private nextTransactionId: number = 0;
    
    public onopen : (e:Event) => void = function() {};
    public onevent : (any) => void = function(msg) {};
	
    constructor(params: WebSocketParams) {
        this.url = params.url;
        this.abortInterval = params.abortInterval;
        this.reconnectInterval = params.reconnectInterval;
        this.connect();
    }
    
	connect(): void {        
		this.ws = new WebSocket(this.url);
        
        var abortTimeout = setTimeout(() => {
            this.ws.close();
        }, this.abortInterval);

        
        this.ws.onopen = (event:Event) => {
            clearTimeout(abortTimeout);
            this.onopen(event);
        };

        this.ws.onclose = (event:CloseEvent) => {
            clearTimeout(abortTimeout);
            this.ws = null;
            setTimeout(() => {
                this.connect();
            }, this.reconnectInterval);
        };
        
		this.ws.onmessage = (msg_event: MessageEvent) => {
            let msg : any = JSON.parse(msg_event.data);
			
            if(!('id' in msg)) { return; }
            if(msg.id < 0) { this.onevent(msg); return; }
            if(!(msg.id in this.transactions)) { return; }
            
            let transaction: Transaction = this.transactions[msg.id];
            transaction.onmessage(msg);
        };
	}
    
	send(msg: any): boolean {
        if(!this.ready())
            return false;
        
		let msg_s = JSON.stringify(msg)
		this.ws.send(msg_s);
        return true;
	}
    
	registerTransaction(transaction: Transaction): void {
		let id = this.nextTransactionId;
		this.nextTransactionId += 1;
		
		transaction.id = id;
		this.transactions[id] = transaction;
	}
    
    
    ready(): boolean {
        return (this.ws != null) && (this.ws.readyState == WebSocket.OPEN);
    }
    
}
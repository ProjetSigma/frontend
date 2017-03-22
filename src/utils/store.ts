import {Injectable} from '@angular/core';
import {Record, RecordConstructor} from 'utils/record';
import {Collection, HashCollection, ProxyCollection} from 'utils/collection';
import {Adapter, RESTRequestParams} from 'utils/adapter';

interface subCollectionDescr {
    action: string;
    ressource: string;
    field?: string;
    auto?: boolean;
}

interface Ressource {
    name: string;
    klass: RecordConstructor;
    idField?: string;
    subActions?: string[];
    subCollections?: subCollectionDescr[];
}

type RessourceDescriptor = RecordConstructor|string;

@Injectable()
export class Store {
    private adapter: Adapter;
    private ressources: {[key: string]: Ressource};
    private pending: {[key: string]: Promise<Record>};
    private records: {[key: string]: Record};
    
    constructor(adapter: Adapter) {
        this.adapter = adapter;
        this.records = {};
        this.pending = {};
        this.ressources = {};
    }
    
    addRessource(res: Ressource) {
        this.ressources[res.name] = res;
    }
    getRessource(name: string): Ressource {
        return this.ressources[name];
    }
    
    hashName(params: RESTRequestParams) {
        return this.adapter.buildUrl(params);
    }
    
    get(hash: string) {
        return this.records[hash];
    }
    
    // ---------------------------------------------------------
    
    fetch(baseName: string, id?: string|number, action?: string, resName?: string): Promise<any> {
        let params: RESTRequestParams = {location: baseName, id: id, action: action};
        let recordName = this.hashName(params);
        if(resName === undefined) resName = baseName;
        
        if(this.pending[recordName] !== undefined) {
            return this.pending[recordName];
        }
        
        this.pending[recordName] = this.adapter.rest(params).then((items) => {
            if(items instanceof Array) {
                let collection = new HashCollection(this, recordName, resName);
                this.records[recordName] = collection;
                
                let subFetch: Promise<any>[] = new Array();
                items.forEach((item) => {
                    let subRecordName = this.hashName({location: resName, id: item['pk'], action: 'retrieve'});
                    subFetch.push(this.itemFetched(resName, subRecordName, item));
                    collection.add(subRecordName);
                });
                return Promise.all(subFetch).then(() => collection);
                
            } else {
                return this.itemFetched(resName, recordName, items);
            }
        });
        
        return this.pending[recordName];
    }
    
    // ---------------------------------------------------------
    
    itemFetched(ressourceName: string, recordName: string, obj: any): Promise<any> {
        const res = this.ressources[ressourceName];
        
        if(this.records[recordName] === undefined) {
            this.records[recordName] = new (res.klass)(this, recordName, ressourceName);
        }
        const record = this.records[recordName];
        for(const prop in obj) {
            record[prop] = obj[prop];
        }
        
        if(res.subCollections) {
            let subFetch: Promise<any>[] = new Array();
            for(const sub of res.subCollections) {
                if(record[sub.field] === undefined) {
                    record[sub.field] = new ProxyCollection(this, this.hashName({location: ressourceName, id: record.__.id(), action: sub.action}), sub.ressource);
                }
                if(sub.auto) {
                    subFetch.push(this.find(ressourceName, record.__.id(), sub.action, sub.ressource));
                }
            }
            return Promise.all(subFetch).then(() => record);
        }
        else {
            return Promise.resolve(record);
        }
    }
    
    // ---------------------------------------------------------
    
    fetchWithCache(baseName: string, id?: string|number, action?: string, resName?: string) : Promise<any> {
        let params: RESTRequestParams = {location: baseName, id: id, action: action};
        let recordName = this.hashName(params);
        
        if (this.records[recordName] === undefined || this.records[recordName].__.invalidated) {
            return this.fetch(baseName, id, action, resName);
        }
        return Promise.resolve(this.records[recordName]);
    }
    
    // ---------------------------------------------------------
    
    find(baseName: string, id?: string|number, action?: string, resName?: string) : Promise<any> {
        if(action === undefined) {
            if(id === undefined) {
                action = 'list';
            } else {
                action = 'retrieve';
            }
        }
        if(resName === undefined) {
            for(let sub of this.ressources[baseName].subCollections || []) {
                if(sub.action == action) {
                    resName = sub.ressource;
                    break;
                }
            }
        }
        
        return this.fetchWithCache(baseName, id, action, resName);
    }
    
    findAll(baseName: string) {
        return Promise.resolve([]);
    }
    subFind(baseName: string, id:number|string, action: string) {
        return Promise.resolve([]);
    }
    
}
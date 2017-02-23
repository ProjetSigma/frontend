import {Injectable} from '@angular/core';
import {DataStore} from 'js-data';


@Injectable()
export class Store extends DataStore {

    constructor() {
        super();
    }

    updateOptions(options) {
        if (!options) { options = {}; }

        options.cacheResponse = true;
        return options;
    }

    find(resourceName: string, id: string|number, options?: any): Promise<any> {
        options = this.updateOptions(options);
        return super.find(resourceName, id, options);
    }

    findAll(resourceName: string, params?: any, options?: any): Promise<any> {
        options = this.updateOptions(options);
        return super.findAll(resourceName, params, options);
    }

    create(resourceName: string, attrs?: any, options?: any): Promise<any> {
        options = this.updateOptions(options);
        return super.create(resourceName, attrs, options);
    }

    update(resourceName: string, id: string|number, attrs: any, options?: any): Promise<any> {
        options = this.updateOptions(options);
        return super.update(resourceName, id, attrs, options);
    }

    updateAll(resourceName: string, attrs: any, params?: any, options?: any): Promise<any> {
        options = this.updateOptions(options);
        return super.updateAll(resourceName, attrs, params, options);
    }

    destroy(resourceName: string, id: string|number, options?: any): Promise<any> {
        options = this.updateOptions(options);
        return super.destroy(resourceName, id, options);
    }

    destroyAll(resourceName: string, params?: any, options?: any): Promise<any> {
        options = this.updateOptions(options);
        return super.destroyAll(resourceName, params, options);
    }
}

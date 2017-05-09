export interface RESTRequestParams {
    location: string;
    action: string;
    data?: any;
    id?: string|number;
    params?: any
};

export enum Method {
    Get, 
    Post, 
    Put, 
    Delete, 
    Options, 
    Head,
    Patch
};

export interface Adapter {
    buildUrl(params: RESTRequestParams): string;
    rest(params: RESTRequestParams, method?: Method): Promise<any>;
};
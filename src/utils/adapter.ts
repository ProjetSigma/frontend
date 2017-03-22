export interface RESTRequestParams {
    location: string;
    action: string;
    data?: any;
    id?: string|number;
    params?: any
};

export interface Adapter {
    buildUrl(params: RESTRequestParams): string;
    rest(params: RESTRequestParams): Promise<any>;
};
import {Component, OpaqueToken, Inject} from '@angular/core';
import {ActivatedRoute, Route, Routes, Router, NavigationExtras}   from '@angular/router';

export interface RouteInput {
    input: string;
    output?: string;
    required?: boolean;
}

export interface RouteDescriptor {
    name: string;
    selector: string;
    inputs?: (RouteInput|string)[];
    route: Route;
}

export interface RoutingComponents {
    routes_descr : RouteDescriptor[];
    routes: Routes;
    components: any[];
    service: any;
    token: OpaqueToken;
    provider: any;
}

export function newRoutingComponents(routes_descr: RouteDescriptor[]) : RoutingComponents {
    // Data provider
    interface Dict { [key: string] : any; };
    class InputService {
        public data: Dict = [];
    }
    let token : OpaqueToken = new OpaqueToken("routing-components-input-service");
    
    // Generate template
    function createInputArgument(input: RouteInput|string) {
        if(typeof input === "string") {
            return '[' + input + ']="inputs.data[\'' + input + '\']" *ngIf="inputs.data[\'' + input + '\'] != undefined" ';
        } else {
            if(!input.output) input.output = input.input;
            return ('[' + input.input + ']="inputs.data[\'' + input.output + '\']" ') + (input.required ? '*ngIf="inputs.data[\'' + input.output + '\'] != undefined" ' : '');
        }
    }
    function createTemplate(route: RouteDescriptor) {
        let tmpl: string = '<'+route.selector+' ';
        for(let input of route.inputs) {
            tmpl += createInputArgument(input);
        }
        tmpl += '></'+route.selector+'>';
        return tmpl;
    }
    
    // Component constructions
    let routes: Routes = [];
    let components: any[] = [];
    for(let route of routes_descr) {
        @Component({
            template: createTemplate(route)
        })
        class component {
            constructor(@Inject(token) public inputs : InputService) {};
        }
        
        route.route.component = component;
        routes.push(route.route);
        components.push(component);
    }
    
    return {
        routes_descr: routes_descr,
        service: InputService,
        token: token,
        routes: routes,
        components: components,
        provider: {provide: token, useClass: InputService}
    };
}
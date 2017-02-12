import {Component, Injectable} from '@angular/core';
import {ActivatedRoute, Route, Routes}   from '@angular/router';

export class RouteDescriptor {
    public name: string;
    public selector: string;
    public inputs: string[] = [];
    public route: Route;
}

export class RoutingComponents {
    public routes_descr : RouteDescriptor[] = [];
    public routes: Routes = [];
    public components: any[] = [];
    public provider: any;
    
    constructor(routes_descr: RouteDescriptor[]) {
        this.routes_descr = routes_descr;
        
        interface Dict { [key: string] : any; };
            
        @Injectable()
        class InputService {
            public data: Dict = [];
        }
        
        for(var r of routes_descr) {
            var tmpl: string = '<'+r.selector+' ';
            for(var i of r.inputs) {
                tmpl += '[' + i + ']="inputs.data[\'' + i + '\']" ';
            }
            tmpl += '></'+r.selector+'>';
            
            @Component({
                template: tmpl
            })
            class component {
                constructor(public inputs : InputService, public route: ActivatedRoute) {};
            }
            
            r.route.component = component;
            this.routes.push(r.route);
            this.components.push(component);
        }
        
        this.provider = InputService;
    }
    
    isRouteEnabled = function(act_route, route_descr) {
        // return act_route.
    }
}

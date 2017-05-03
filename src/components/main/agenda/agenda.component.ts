import { Component } from '@angular/core';
import {APIService} from 'services/api.service';
import {Event} from 'resources/event';
import * as $ from 'jquery';

@Component({
    selector: 'agenda',
    templateUrl: './agenda.component.html',
})

export class AgendaComponent {
  //public events_old: Event[] = [];

  public events = [];
  public calendarOptions = {};

  constructor(private api: APIService) {
    this.events = [];
    this.events.push({
      'title': 'Random',
      'start': '2017-04-10'
    });
    this.calendarOptions = {
      defaultView: 'month',
      events: this.getEvents
    };

    console.log($.fn.jquery);
  }

  getEvents(start, stop, callback) {
    //this.events = [];
    this.api.store.find('event').then(res => {
      this.convertEvents(res);
      callback(this.events);
    });
  }

  convertEvents(events){
    events.forEach((event: Event) => {
        console.log("Event added ");
        this.events.push({
          id: event.id,
          title: event.description,
          start: '2017-03-22',
          location: event.place_name
        });
    })
  }

  /*calendarOptions:Object = {
    defaultView: 'month',
    events: this.events
  }*/


}

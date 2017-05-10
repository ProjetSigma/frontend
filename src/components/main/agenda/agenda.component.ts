import { Component, Input } from '@angular/core';
import { Event } from 'resources/event';

@Component({
    selector: 'agenda',
    templateUrl: './agenda.component.html',
})

export class AgendaComponent {
  public isSelected : boolean = false;
  public selectedEvent : Event;

  constructor() {};
  calendarOptions:Object = {
    defaultView: 'month',
  };

  selectEvent(e: Event){
    this.selectedEvent = e;
    this.isSelected = true;
  }

}

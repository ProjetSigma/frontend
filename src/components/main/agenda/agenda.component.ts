import { Component } from '@angular/core';

@Component({
    selector: 'agenda',
    templateUrl: './agenda.component.html',
})

export class AgendaComponent {
  calendarOptions:Object = {
    defaultView: 'month',
  }
}

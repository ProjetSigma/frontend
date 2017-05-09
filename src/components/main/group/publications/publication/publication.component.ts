import {Component, Input} from '@angular/core';
import {Publication} from 'resources/publication';

@Component({
  templateUrl: 'publication.component.html',
  selector: 'publication'
})

export class PublicationComponent {
   @Input('publication') publication: Publication;
   constructor(){};

}

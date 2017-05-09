import {Component, Input, OnInit} from '@angular/core';
import {Publication} from 'resources/publication';

@Component({
  templateUrl: 'publication.component.html',
  selector: 'publication'
})

export class PublicationComponent implements OnInit {
  public collapsed: boolean;
  public text: string;
  public maxLengthAllowed = 250;

  toggleCollapse() {
     if (this.collapsed){
       this.text = this.publication.content;
     }
     else {
       this.text = this.publication.content.substring(0, this.maxLengthAllowed) + ' ... ';
     }
     this.collapsed = ! this.collapsed;
  }

   @Input('publication') publication: Publication;
   constructor(){};
   ngOnInit(){
     this.text = this.publication.content.substring(0, this.maxLengthAllowed) + ' ... ';
     this.collapsed = this.publication.content.length > this.maxLengthAllowed;
   }
}

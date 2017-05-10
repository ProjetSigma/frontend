import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';

import {APIService} from 'services/api.service';
import {User} from 'resources/user';
import {Collection} from 'utils/collection';
import {GroupMember} from 'resources/group-member';

import {PhoneNumberFrenchPipe} from '../../phone-number-french';

@Component({
  selector: 'user-inline-display',
  templateUrl: 'user-inline-display.component.html'
})
export class UserInlineDisplayComponent implements OnInit{
  @Input('membership') membership;
  @Input('groupfields') groupfields;
  public user = {firstname:"Firstname", lastname:"Lastname"};
  public fields = [];

  constructor(public api: APIService) {
  };

  public show = false;

  ngOnInit(){/*
    this.api.store.find("user",this.membership.user).then((obj) => {
      this.user = obj;
      })*/ //TODO décommenter dès que les permissions sont réglées
    
    this.membership.field_values.forEach((obj) => {
      this.fields.push({id:obj.field,name:obj.field,value:obj.value});
    });

    var tfields = this.fields; //TODO Supprimer tout ça une fois les memberships corrigées
    this.fields=[]
    tfields.forEach((obj) => {
      var b = true;
      this.groupfields.forEach((objj) => {
          if(b && obj.id == objj.pk){
            obj.name = objj.name;
            this.fields.push(obj);
            b=false;
          }
        })
      })
  }
};

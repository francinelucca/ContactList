import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";

import { Contact, Phone } from '../contact';
import { ContactService } from '../contact-service.service';
import { PHONE_TYPES} from '../phone-type';
import { group } from '@angular/animations';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit {
  emptyString= "";
  title= "Create New Contact";
  id?: number;
  isEdit: boolean;
  phone_types: string[];
  phones: Phone[];
  contact: Contact = {
    id: null,
    firstName: "",
    lastName: "",
    company: "",
    phones: [],
    email: ""
  }

  constructor(
              private contactService: ContactService,
              private dialogRef: MatDialogRef<ContactsEditComponent>,
              @Inject(MAT_DIALOG_DATA) data
              ) { 
              if(data.contact){
                this.contact = data.contact;
              }
  }

  ngOnInit(): void {
    this.phone_types = PHONE_TYPES;
    if(this.contact.id){
      this.isEdit= true;
      this.title = "Update Contact";
    }
  }

  addPhone(phoneType: string, phoneNumber: string){
    if(phoneNumber){
      let id = this.contact.phones.length + 1;
      let phone = {
        id: id,
        type: phoneType,
        number: phoneNumber,
      }
      this.contact.phones.push(phone);
    }
  }

  removePhone(phoneId: number){
    let index = this.contact.phones.map(p => {
      return p.id;
    }).indexOf(phoneId);
    this.contact.phones.splice(index,1);
  }

  saveContact(){
      this.contact.id ? this.contactService.updateContact(this.contact) : this.contactService.addContact(this.contact);
      this.dialogRef.close(true);
  }

  close(){
    this.dialogRef.close(true);
  }

}

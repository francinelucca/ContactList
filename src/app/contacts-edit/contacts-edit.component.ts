import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";

import { Contact, Phone } from '../contact';
import { ContactService } from '../contact-service.service';
import { PHONE_TYPES} from '../phone-type';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit {
  form: FormGroup;
  title= "Create New Contact";
  id?: number;
  isEdit: boolean;
  phone_types: string[];
  phones: Phone[];
  contact: Contact = {
    id: null,
    firstName: " ",
    lastName: " ",
    company: " ",
    phones: [],
    email: " "
  }

  constructor(
              private fb: FormBuilder,
              private contactService: ContactService,
              private dialogRef: MatDialogRef<ContactsEditComponent>,
              @Inject(MAT_DIALOG_DATA) data
              ) { 
              if(data.contact){
                this.contact = data.contact;
              }
               this.form = fb.group({
                 firstName: [this.contact.firstName, Validators.required],
                 lastName: [this.contact.lastName, Validators.required],
                 company: [this.contact.company, Validators.nullValidator],
                 email: [this.contact.email, Validators.nullValidator],
               });
  }

  ngOnInit(): void {
    this.phone_types = PHONE_TYPES;
    if(this.contact.id){
      this.isEdit= true;
      this.title = "Update Contact";
      this.contact.phones.forEach(p => this.createPhoneControl(p));
    }
  }

  createPhoneControl(phone: Phone): void {
    this.form.addControl(
        'phoneNumber' + String(phone.id),
        new FormControl(phone.number, [Validators.required])
    );
    this.form.addControl(
        'phoneType' + String(phone.id),
        new FormControl(phone.type, [Validators.required])
    );
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
      this.createPhoneControl(phone);
    }
  }

  removePhone(phoneId: number){
    let index = this.contact.phones.map(p => {
      return p.id;
    }).indexOf(phoneId);
    this.contact.phones.splice(index,1);
  }

  saveContact(){
    if(this.form.valid){
      this.contact.id ? this.contactService.updateContact(this.contact) : this.contactService.addContact(this.contact);
      this.dialogRef.close(true);
    }
  }

  close(){
    this.dialogRef.close(false);
  }

}

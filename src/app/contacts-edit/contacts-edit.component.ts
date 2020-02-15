import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

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
  defaultPhone: Phone= {
    id: -1,
    type:"home",
    number:""
  };
  contact: Contact = {
    id: null,
    firstName: "",
    lastName: "",
    company: "",
    phones: [Object.assign({},this.defaultPhone)],
    email: ""
  }

  constructor(
              private fb: FormBuilder,
              private contactService: ContactService,
              private dialogRef: MatDialogRef<ContactsEditComponent>,
              @Inject(MAT_DIALOG_DATA) data
              ) { 

              this.id = data.id;
               this.form = fb.group({
                 firstName: ['', Validators.required],
                 lastName: ['', Validators.required],
                 company: ['', Validators.nullValidator],
                 email: ['', Validators.nullValidator],
                 phoneNumber: [''],
                 phones: [null],
                 phoneTypes: [null],
               })
  }

  ngOnInit(): void {
    this.phone_types = PHONE_TYPES;
    if(this.id){
      this.isEdit= true;
      this.getContact();
    }
  }

  addPhone(){
    let id = this.contact.phones.length;
    this.contact.phones[this.contact.phones.length-1].id = id;
    this.contact.phones.push(Object.assign({},this.defaultPhone));
  }

  removePhone(phoneId: number){
    let index = this.contact.phones.map(p => {
      return p.id;
    }).indexOf(phoneId);
    this.contact.phones.splice(index,1);
  }

  getContact() {
    this.contact = this.contactService.getContact(this.id);
    this.contact.phones.push(Object.assign({},this.defaultPhone));
    this.title = "Update Contact:";
  }

  saveContact(){
    if(this.form.valid){
      this.contact.phones.pop();
      this.id ? this.contactService.updateContact(this.contact) : this.contactService.addContact(this.contact);
      this.dialogRef.close(true);
    }
  }

  close(){
    this.dialogRef.close(false);
  }

}

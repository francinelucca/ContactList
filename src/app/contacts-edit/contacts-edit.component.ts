import { Component, OnInit } from '@angular/core';

import { Contact, Phone } from '../contact';
import { ContactService } from '../contact-service.service';
import { PHONE_TYPES} from '../phone-type';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit {
  phone_types: string[];
  phones: Phone[];
  defaultPhone: Phone= {
    id: -1,
    type:"home",
    number:"add new number"
  };

  constructor(private contactService: ContactService) { 
  }

  ngOnInit(): void {
    this.phone_types = PHONE_TYPES;
    this.phones = [this.defaultPhone];
  }

  addPhone(phone_type: string, number: string){
    let id = this.phones.length;
    let newPhone: Phone = {
      id: id,
      type: phone_type,
      number: number
    }
    this.phones.splice(this.phones.length-1,0,newPhone);
  }

  removePhone(phoneId: number){
    let index = this.phones.map(p => {
      return p.id;
    }).indexOf(phoneId);
    this.phones.splice(index,1);
  }

  saveContact(firstName: string, lastName: string, company: string, email: string){
    this.phones.pop();
    let newContact: Contact = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      company: company,
      email: email,
      phones: this.phones,
    }
    this.contactService.addContact(newContact);
  }

}

import { Component, OnInit } from '@angular/core';

import { Contact, Phone } from '../contact';
import { ContactService } from '../contact-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContactList();
    console.log(this.contacts);
  }

  deleteContact(contact: Contact): void {
    this.contacts = this.contacts.filter(c => c!== contact);
    this.contactService.deleteContact(contact);
  }

}

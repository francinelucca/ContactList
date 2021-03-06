import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactsEditComponent } from '../contacts-edit/contacts-edit.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { Contact, Phone } from '../contact';
import { ContactService } from '../contact-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  allContacts: Contact[];
  contacts: Contact[] = [];
  term: string = "";

  constructor(private contactService: ContactService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getContacts();
  }

  search(){
    this.contacts = this.allContacts.filter(c => `${c.firstName} ${c.lastName}`.includes(this.term));
  }

  getContacts(): void {
    this.allContacts = this.contactService.getContactList();
    this.contacts = Object.assign( this.contacts,this.allContacts);
  }

  deleteContact(contact: Contact): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data= {
      confirmationMessage: `Are you sure you want to delete Contact: ${contact.firstName} ${contact.lastName}?`
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.allContacts = this.allContacts.filter(c => c!== contact);
          this.search();
          this.contactService.deleteContact(contact);
        }
      });
  }

  showEditForm(contact?: Contact) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data= {
      contact: contact
    };

    const dialogRef = this.dialog.open(ContactsEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.getContacts();
          this.search();
        }
      }
    );
  }

}

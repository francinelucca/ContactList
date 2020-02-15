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
  contacts: Contact[];

  constructor(private contactService: ContactService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContactList();
  }

  deleteContact(contact: Contact): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data= {
      confirmationMessage: `Are you sure you want to delete Contact: ${contact.firstName} ${contact.lastName}?`
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.contacts = this.contacts.filter(c => c!== contact);
          this.contactService.deleteContact(contact);
        }
      });
  }

  showEditForm(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data= {
      id: id
    };

    const dialogRef = this.dialog.open(ContactsEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.getContacts();
        }
      }
    );
  }

}

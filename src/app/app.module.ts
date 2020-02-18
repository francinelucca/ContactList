import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsEditComponent } from './contacts-edit/contacts-edit.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { RegexValidatorDirective } from './regex-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContactsEditComponent,
    ContactsComponent,
    ConfirmationDialogComponent,
    RegexValidatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StorageServiceModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ContactsEditComponent,ConfirmationDialogComponent]
})
export class AppModule { }

import { Inject,Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import Lodash from 'lodash';

import { Contact } from './contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  STORAGE_KEY = 'local_contactList';

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) { }

  public getContactList(): Contact[] {
    const currentContactList = this.storageService.get(this.STORAGE_KEY);
    if(!currentContactList){
      return [];
    }
    return JSON.parse(currentContactList);
  }

  public getContact(id: number): Contact {
    const currentContactList = this.getContactList();
    const contact = currentContactList.find(c => c.id === id);
    return contact;
  }


  private setContactList(contactList: Contact[]): void {
    this.storageService.set(this.STORAGE_KEY, JSON.stringify(contactList));

  }

  public addContact(contact: Contact): void {
    let currentContactList = this.getContactList();
    if(currentContactList && currentContactList.length > 0){
      contact.id = Math.max.apply(Math, currentContactList.map(function(c){return c.id})) +1;
      currentContactList.push(contact);
    }else{
      contact.id = 1;
      currentContactList = [contact];
    }
    this.setContactList(currentContactList);
  }

  public updateContact(contact: Contact): void {
    const currentContactList = this.getContactList();
    var index = currentContactList.map(function(c){return c.id}).indexOf(contact.id);
    if (index >= 0){
      currentContactList[index] = contact;
    }
    console.log(currentContactList);
    this.setContactList(currentContactList);
  }

  public deleteContact(contact: Contact | number): void {
    const id = typeof contact === 'number' ? contact : contact.id;
    let currentContactList = this.getContactList();
    currentContactList = currentContactList.filter(c => c.id !== id);
    this.setContactList(currentContactList);
  }

}

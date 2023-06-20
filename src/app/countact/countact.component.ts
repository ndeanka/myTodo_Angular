import {Component, OnInit} from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from '../share/contact';

@Component({
  selector: 'app-countact',
  templateUrl: './countact.component.html',
  styleUrls: ['./countact.component.css']
})
export class CountactComponent implements OnInit{
  contactArr: Contact[] = [];
  newContact!: Contact;
  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.getContact();
    this.addContact();
      
  }
  getContact(){
    this.contactService.getContacts().subscribe(
      (contact: Contact[]) => {
        this.contactArr = contact
      },
      (err: any) => {
        console.log('Unable to get list of tasks:', err);
      }
    )
  }

  addContact(){
    this.contactService.addContact(this.newContact).subscribe(
      (contact: Contact) => {
        this.contactArr.push(contact);
      },
      (err: any) => {
        console.log('Unable to add contact:', err);
      } 
    )
  }
}

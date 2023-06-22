import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from '../share/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './countact.component.html',
  styleUrls: ['./countact.component.css']
})
export class CountactComponent implements OnInit {
  contactArr: Contact[] = [];
  newContact: Contact = new Contact();
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    if (this.contactArr.length === 0) {
      this.getContact();
    }
  }

  getContact(): void {
    this.contactService.getContacts().subscribe(
      (contact: Contact[]) => {
        this.contactArr = contact;
      },
      (err: any) => {
        console.log('Unable to get list of contacts:', err);
      }
    );
  }

  addContact(): void {
    this.newContact.name = this.name;
    this.newContact.email = this.email;
    this.newContact.subject = this.subject;
    this.newContact.message = this.message;

    this.contactService.addContact(this.newContact).subscribe(
      (contact: Contact) => {
        this.contactArr.push(contact);
        console.log(this.contactArr);

        // Clear input fields
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
      },
      (err: any) => {
        console.log('Unable to add contact:', err);
      }
    );
  }
}

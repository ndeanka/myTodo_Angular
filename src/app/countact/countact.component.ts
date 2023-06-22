import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../share/contact';
import {filter, Observable} from "rxjs";
import { Task } from '../share/task';

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
  Object: any;

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    if (this.contactArr.length === 0) {
      this.getContact();
    }
  }

  getContact(): void {
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contactArr = contacts;
        console.log(this.contactArr);
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
        // console.log(this.contactArr);

        // Clear input fields
        // this.name = '';
        // this.email = '';
        // this.subject = '';
        // this.message = '';
      },
      (err: any) => {
        console.log('Unable to add contact:', err);

      }
    );
  }

  deleteContact(contact: any) {
    this.contactService.deleteContact(contact.id).subscribe(
      () => {
        this.contactArr = this.contactArr.filter(item => item.id !== contact.id);
        console.log(this.contactArr)
      },
      error => {
        console.error('Failed to delete task:', error);
        alert('Failed to delete task');
      }
    )
  }

}

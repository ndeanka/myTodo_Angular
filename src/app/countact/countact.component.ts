import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../share/contact';
import {filter, Observable} from "rxjs";
import {Task} from '../share/task';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './countact.component.html',
  styleUrls: ['./countact.component.css']
})
export class CountactComponent implements OnInit {
  contactArr: Contact[] = [];
  // newContact: Contact = new Contact();
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  Object: any;
  @ViewChild('myForm')
  form!: NgForm;

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
    this.name = this.form.value.formGroup.name;
    this.email = this.form.value.formGroup.email;
    this.subject = this.form.value.formGroup.subject;
    this.message = this.form.value.formGroup.message;

    // Create a new Contact object
    const newContact: Contact = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    };

    // reset form
    this.form.reset()

    this.contactService.addContact(newContact).subscribe(
      (contact: Contact) => {
        this.contactArr.push(contact);
      },
      (err: any) => {
        console.log('Unable to add contact:', err);

      }
    );

    console.log(this.form);
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

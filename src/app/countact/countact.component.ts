import {Component, OnInit} from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from '../share/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-countact',
  templateUrl: './countact.component.html',
  styleUrls: ['./countact.component.css']
})
export class CountactComponent implements OnInit{
  contactArr: Contact[] = [];
  newContact: Contact = new Contact();
  name: string = "";
  email: string = "";
  subject: string = "";
  message: string = "";
  contactForm!: FormGroup;
  
  constructor(private contactService: ContactService, private formBuilder: FormBuilder){
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      subject: ['', Validators.required],
      message: ['', Validators.required],

    })

  }

  ngOnInit(): void {
    this.getContact();
    // this.addContact();
      
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

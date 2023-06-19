import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../share/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serviceURL = 'https://todolist-f6b44-default-rtdb.firebaseio.com/contact.json';
 

  constructor(private http: HttpClient) { 

  }

  addContact(contact: Contact):Observable<Contact>{
    return this.http.post<Contact>(this.serviceURL, contact);
  }

  getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.serviceURL);
  }

  getContact(): Observable<Contact>{
    return this.http.get<Contact>(`this.serviceURL/${1}`);
  }

  updateCOntact(contact:Contact): Observable<Contact>{
    return this.http.put<Contact>(`this.serviceURL/${1}`, contact);
  }

  deleteContact(id:number):Observable<Contact>{
    return this.http.delete<Contact>(`this.serviceURL/${id}`)
  }
}

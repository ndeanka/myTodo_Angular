import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {Contact} from '../share/contact';
import {environment} from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serviceURL = 'https://contact-2576a-default-rtdb.firebaseio.com/contact.json';

  // private serviceURL = environment.apiUrlCont;


  constructor(private http: HttpClient) {

  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.serviceURL, contact);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.serviceURL).pipe(
      map(res => {
        const todoList: Contact[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            todoList.push({...res[key], id: key});
          }
        }
        return todoList;
      })
    );
  }

  getContact(): Observable<Contact> {
    return this.http.get<Contact>(`this.serviceURL/${1}`);
  }

  updateCOntact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`this.serviceURL/${1}`, contact);
  }

  deleteContact(id: string): Observable<Contact> {
    return this.http.delete<Contact>(`this.serviceURL/${id}`)
  }
}

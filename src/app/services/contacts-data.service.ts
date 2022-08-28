import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactsDataService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get('./assets/mock-contacts.json');
  }
}

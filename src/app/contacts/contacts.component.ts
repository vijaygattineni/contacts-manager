import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../services/contacts-data.service';
import { Group } from '../contact-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactsData: Group[] = [];

  constructor(private contactsService: ContactsDataService, private router: Router) { }

  getContactDetails() {
    this.contactsService.getContacts().subscribe((response) => {
      this.contactsData = response.data;
    })
  }

  updateGroups($event) {
    this.contactsData.push($event);
  }

  ngOnInit() {
    this.getContactDetails();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  deleteGroup(index) {
    this.contactsData = this.contactsData.splice(index,1);
  }
}

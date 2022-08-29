import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Group, Contact } from '../../contact-types';
import { MODE } from '../../contact-enum';

@Component({
  selector: 'app-contact-group',
  templateUrl: './contact-group.component.html',
  styleUrls: ['./contact-group.component.scss']
})
export class ContactGroupComponent implements OnInit {

  @Input() groupDetail;
  @ViewChild('content') content: NgbModal;
  selectedGroup: Group;
  selectedContactIndex: any;
  contactForm: FormGroup;
  searchTerm: string = '';
  transformedContacts: Contact[];
  MODE = MODE;
  mode: string;
  pageConfig = {
    page: 1,
    pageSize: 2,
    sortBy: 'name',
    directionAsc: false
  }

  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.transformContacts();
    this.initializeSignInForm();
  }

  initializeSignInForm(selectedContact?: Contact) {
    this.contactForm = this.fb.group({
      email: [(selectedContact) ? selectedContact.email : ''],
      name: [(selectedContact) ? selectedContact.name : '', Validators.required],
      phone: [(selectedContact) ? selectedContact.phone : '', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/^[0-9]{10}/)])]
    });
  }

  resetTransform() {
    this.transformedContacts = this.groupDetail.contacts;
  }

  transformContacts() {
    this.resetTransform();
    this.transformedContacts = this.transformedContacts.slice((this.pageConfig.page - 1) * this.pageConfig.pageSize, (this.pageConfig.page - 1) * this.pageConfig.pageSize + this.pageConfig.pageSize);
  }

  open(content, groupDetail: Group, mode: any, contact?: Contact, index?: number) {
    this.mode = mode;
    this.selectedGroup = groupDetail;
    if (mode == MODE.ADD) {
      this.initializeSignInForm();
      this.modalService.open(content);
    } else if (mode === MODE.EDIT) {
      this.selectedContactIndex = index;
      this.initializeSignInForm(contact);
      this.modalService.open(content);
    }
  }

  changeStatus(contact) {
    contact.status = (contact.status == 'active') ? 'inactive' : 'active';
  }

  searchContact(searchText: string) {
    this.searchTerm = searchText;
    if (searchText && searchText.length) {
      this.transformedContacts = this.groupDetail.contacts;
      this.transformedContacts = this.transformedContacts.filter(contact => contact.name.toLowerCase().includes(searchText.toLowerCase()) || contact.email.toLowerCase().includes(searchText.toLowerCase()) || contact.status.toLowerCase().includes(searchText.toLowerCase()) || contact.phone.toLowerCase().includes(searchText.toLowerCase()));
    } else {
      this.transformedContacts = this.groupDetail.contacts;
      this.transformContacts();
    }
  }

  saveContact(contactForm: NgForm, mode?) {
    if (mode === 'add') {
      this.groupDetail.contacts.push({ ...contactForm.value, active: true });
      this.transformContacts();
    } else {
      this.modalService.dismissAll();
      this.selectedGroup.contacts[this.selectedContactIndex] = { ...contactForm.value, active: true };
      this.resetTransform();
    }
  }

  deleteContact(contact: Contact, index: number) {
    this.groupDetail.contacts.splice(index, 1);
    this.transformContacts();
  }

  sort(inputField: any, directionAscending: boolean) {
    if (directionAscending) {
      this.groupDetail.contacts = this.groupDetail.contacts.sort(function (a, b) {
        var valueA = a[inputField].toUpperCase();
        var valueB = b[inputField].toUpperCase();
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
    } else {
      this.groupDetail.contacts = this.groupDetail.contacts.sort(function (a, b) {
        var valueA = a[inputField].toUpperCase();
        var valueB = b[inputField].toUpperCase();
        if (valueA < valueB) {
          return 1;
        }
        if (valueA > valueB) {
          return -1;
        }
        return 0;
      });
    }
    this.transformContacts();
  }

}

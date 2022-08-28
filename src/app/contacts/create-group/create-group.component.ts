import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  @Output() groupAdded = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  registerGroup(form: NgForm) {
    let group = {
      ...form.value,
      contacts: []
    }
    this.groupAdded.next(group);
    form.reset();
  }
}

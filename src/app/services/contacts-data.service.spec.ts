import { TestBed } from '@angular/core/testing';

import { ContactsDataService } from './contacts-data.service';

describe('ContactsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactsDataService = TestBed.get(ContactsDataService);
    expect(service).toBeTruthy();
  });
});

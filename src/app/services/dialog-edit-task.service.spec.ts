import { TestBed } from '@angular/core/testing';

import { DialogEditTaskService } from './dialog-edit-task.service';

describe('DialogsService', () => {
  let service: DialogEditTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogEditTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

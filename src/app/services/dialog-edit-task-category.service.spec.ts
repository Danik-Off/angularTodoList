import { TestBed } from '@angular/core/testing';

import { DialogEditTaskCategoryService } from './dialog-edit-task-category.service';

describe('DialogEditTaskCategoryService', () => {
  let service: DialogEditTaskCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogEditTaskCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

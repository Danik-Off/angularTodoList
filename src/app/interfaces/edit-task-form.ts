import { FormControl } from '@angular/forms';

export interface EditTaskForm {
  done: FormControl;
  text: FormControl;
  priority: FormControl;
  startDate: FormControl;
  endDate: FormControl;
  taskСategory: FormControl;

}

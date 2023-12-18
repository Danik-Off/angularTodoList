import { FormControl } from '@angular/forms';
import { TaskCategory } from './taskCategory';

export interface EditTaskForm {
  done: FormControl<boolean|null>;
  text: FormControl<string|null>;
  priority: FormControl<number|null>;
  startDate: FormControl<Date|null>;
  endDate: FormControl<Date|null>;
  taskСategory: FormControl<TaskCategory|null>;
}

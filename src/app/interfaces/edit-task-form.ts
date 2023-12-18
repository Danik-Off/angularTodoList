import { FormControl } from '@angular/forms';
import { TaskCategory } from './taskCategory';

export interface EditTaskForm {
  done: FormControl<boolean>;
  text: FormControl<string>;
  priority: FormControl<number>;
  startDate: FormControl<Date>;
  endDate: FormControl<Date>;
  taskСategory: FormControl<TaskCategory>;

}

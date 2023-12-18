import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import { DialogEditTaskService } from 'src/app/services/dialog-edit-task.service';

import { TaskService } from 'src/app/services/task.service';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskCategoriesService } from 'src/app/services/task-categories.service';
import { Subject, takeUntil } from 'rxjs';
import {
  BUTTON_LABEL_CANCEL,
  BUTTON_LABEL_SAVE,
  LABEL_END_DATE,
  LABEL_ID,
  LABEL_PRIORITY,
  LABEL_START_DATE,
  LABEL_TEXT,
  PLACEHOLDER_CATEGORY,
  PLACEHOLDER_PRIORITY,
  TITLE_EDIT_TASK,
  TITLE_NEW_TASK,
} from 'src/app/shared/constants';
import { EditTaskForm } from 'src/app/interfaces/edit-task-form';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent implements OnInit, OnDestroy {
  id: string | null = null;

  editTaskForm = new FormGroup<EditTaskForm>({
    done: new FormControl<boolean|null>(false),
    text: new FormControl<string|null>(null,[Validators.required]),
    priority: new FormControl<number|null>(0),
    startDate: new FormControl(new Date(Date.now())),
    endDate: new FormControl(new Date(Date.now())),
    taskСategory: new FormControl(),
  });

  titleDialog: string = TITLE_NEW_TASK;

  buttonLabelSave: string = BUTTON_LABEL_SAVE;
  buttonLabelCancel: string = BUTTON_LABEL_CANCEL;

  idLabel: string = LABEL_ID;
  textLabel: string = LABEL_TEXT;
  priorityLabel: string = LABEL_PRIORITY;
  startDateLabel: string = LABEL_START_DATE;
  endDateLabel: string = LABEL_END_DATE;
  placeholderCategory: string = PLACEHOLDER_CATEGORY;
  placeholderPriority: string = PLACEHOLDER_PRIORITY;

  visible: boolean = false;

  selectedCategory!: TaskCategory[];

  taskCategories: TaskCategory[] = [];

  priorities:number[] =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private unsubscribe = new Subject<void>();

  constructor(
    private dialogService: DialogEditTaskService,
    private categoriesService: TaskCategoriesService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.dialogService.dialogState$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        if ( typeof(value)==="string") {
          this.id = value;
          const TASK = this.taskService.getTask(value);
          const categoryId =  TASK.categoryId??"";
          const CATEGORY = this.categoriesService.getCategory(categoryId) ?? 'default';

          this.editTaskForm.setValue({
            done: TASK.done,
            priority: TASK.priority,
            text: TASK.text,
            startDate: new Date(TASK.startDate as Date),
            endDate: new Date(TASK.endDate as Date),
            taskСategory: CATEGORY,
          });

        } else {
          this.id = null;
        }
        this.visible = Boolean(value);
      });

    this.categoriesService.categories$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((val) => {
        this.taskCategories = val;
      });
  }
  handlerHideDialog(): void {
    this.dialogService.closeDialogEditTask();
  }



  handlerSaveBtn(): void {
    console.log(this.id)
    if (this.id) {
      this.editTask();
    } else {
      this.createNew();
    }
    this.handlerHideDialog()
  }

  createNew(): void {
    this.titleDialog = TITLE_NEW_TASK;
   
    if (this.editTaskForm.valid) {
      const formValue = this.editTaskForm.getRawValue();
    
      this.taskService.addTask(
        formValue.text as string,
        formValue.priority as number,
        new Date(formValue.startDate as Date),
        new Date(formValue.endDate as Date),
        formValue.taskСategory?.id??null
      );
    }
  }

  editTask(): void {
  
    this.titleDialog = TITLE_EDIT_TASK;

    if (this.editTaskForm.valid) {
      const formValue = this.editTaskForm.getRawValue();
    
      this.taskService.editTask(
        this.id as string,
        formValue.text as string,
        formValue.priority as number,
        new Date(formValue.startDate as Date),
        new Date(formValue.endDate as Date),
        formValue.taskСategory?.id??null
      );
    }
  }
  clearForm(): void {
    this.editTaskForm.setValue({
      done: false,
      priority: 0,
      text: "",
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      taskСategory:null,
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

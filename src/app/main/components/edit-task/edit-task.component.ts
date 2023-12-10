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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  TITLE_EDIT_TASK,
  TITLE_NEW_TASK,
} from 'src/app/shared/constants';

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

  editTaskForm = new FormGroup({
    done: new FormControl(),
    text: new FormControl(),
    priority: new FormControl(1),
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

  visible: boolean = true;

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
        if (value) {
          this.id = value;
          const TASK = this.taskService.getTask(value);
          const CATEGORY =
            this.categoriesService.getCategory(TASK.categoryId) ?? 'default';

          this.editTaskForm.setValue({
            done: TASK.done,
            priority: TASK.priority,
            text: TASK.text,
            startDate: new Date(TASK.startDate),
            endDate: new Date(TASK.endDate),
            taskСategory: CATEGORY,
          });
        } else {
          this.id = null;
        }

         this.visible = !this.visible;
      });

    this.categoriesService.categories$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((val) => {
        this.taskCategories = val;
      });
  }

  handlerCancelBtn(): void {
    this.visible = false;
  }

  handlerSaveBtn(): void {
    if (this.id) {
      this.editTask();
    } else {
      this.createNew();
    }
    this.visible = false;
  }

  createNew(): void {
    this.titleDialog = TITLE_NEW_TASK;
    const TEXT = this.editTaskForm.get('text')?.value;
    const PRIORITY = this.editTaskForm.get('priority')?.value;
    const START_DATE = this.editTaskForm.get('startDate')?.value;
    const END_DATE = this.editTaskForm.get('endDate')?.value;
    const TASK_CATEGORY = this.editTaskForm.get('taskСategory')?.value;
    const TASK_CATEGORY_ID = TASK_CATEGORY ? TASK_CATEGORY.id : null;

    if (TEXT && PRIORITY && START_DATE && END_DATE) {
      this.taskService.addTask(
        TEXT,
        PRIORITY,
        new Date(START_DATE),
        new Date(END_DATE),
        TASK_CATEGORY_ID,
      );
    }
  }

  editTask(): void {
    this.titleDialog = TITLE_EDIT_TASK;

    const TEXT = this.editTaskForm.get('text')?.value;
    const PRIORITY = this.editTaskForm.get('priority')?.value;
    const START_DATE = this.editTaskForm.get('startDate')?.value;
    const END_DATE = this.editTaskForm.get('endDate')?.value;
    const TASK_CATEGORY = this.editTaskForm.get('taskСategory')?.value;
    const TASK_CATEGORY_ID = TASK_CATEGORY ? TASK_CATEGORY.id : null;


    if (this.id && TEXT && PRIORITY && START_DATE && END_DATE)
      this.taskService.editTask(
        this.id,
        TEXT,
        PRIORITY,
        new Date(START_DATE),
        new Date(END_DATE),
        TASK_CATEGORY_ID,
      );
  }
  clearForm(): void {
    this.editTaskForm.setValue({
      done: false,
      priority: null,
      text: null,
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      taskСategory: null,
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

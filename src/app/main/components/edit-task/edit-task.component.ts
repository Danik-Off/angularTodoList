import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TaskСategory } from 'src/app/interfaces/taskCategory';
import { DialogEditTaskService } from 'src/app/services/dialog-edit-task.service';

import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
export class EditTaskComponent {

  constructor(
    private dialogService: DialogEditTaskService,
    private taskService: TaskService,
  ) {}

  id: string | null = null;

  editTaskForm = new FormGroup({
    text: new FormControl(),
    priority: new FormControl(1),
    startDate: new FormControl(Date.now()),
    endDate: new FormControl(Date.now()),
    taskСategoryId: new FormControl('test'),
  });

  visible: boolean = false;

  selectedCategory: any;

  taskCategories: TaskСategory[] = [];

  ngOnInit() {
    this.dialogService.dialogState$.subscribe((value) => {
      if (value) {
      }
      this.visible = true;
    });
  }

  handlerCancelBtn() {
    this.visible = false;
  }

  handlerSaveBtn() {
    if (!!this.id) {
      this.editTask();
    } else {
      this.createNew();
    }
  }

  createNew() {
    let text = this.editTaskForm.get('text')?.value;
    let priority = this.editTaskForm.get('priority')?.value;
    let startDate = this.editTaskForm.get('startDate')?.value;
    let endDate = this.editTaskForm.get('endDate')?.value;
    let taskСategoryId = this.editTaskForm.get('taskСategoryId')?.value;

    if (!!text && !!priority && !!startDate && endDate && !!taskСategoryId) {
      this.taskService.addItem(
        text,
        priority,
        new Date(startDate),
        new Date(endDate),
        taskСategoryId,
      );
      this.visible = false;
    }
  }

  editTask() {
    let text = this.editTaskForm.get('text')?.value;
    let priority = this.editTaskForm.get('priority')?.value;
    let startDate = this.editTaskForm.get('startDate')?.value;
    let endDate = this.editTaskForm.get('endDate')?.value;
    let taskСategoryId = this.editTaskForm.get('taskСategoryId')?.value;

    if (
      this.id &&
      !!text &&
      !!priority &&
      !!startDate &&
      endDate &&
      !!taskСategoryId
    )
      this.taskService.editItem(
        this.id,
        text,
        priority,
        new Date(startDate),
        new Date(endDate),
        taskСategoryId,
      );
  }
}

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

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CalendarModule
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  constructor(private dialogService: DialogEditTaskService,private taskService:TaskService) {}
  visible: boolean = false;

  openedTask:Task|undefined;

  selectedCategory: any;

  taskCategories: TaskСategory[] = [];

  ngOnInit() {
    this.dialogService.dialogState$.subscribe((value)=>{
      console.log(value)
      this.visible =value

    })
  }


}

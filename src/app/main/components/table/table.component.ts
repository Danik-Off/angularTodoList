import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Task } from 'src/app/interfaces/task';
import { AuthService } from 'src/app/services/auth.service';
import { DialogEditTaskService } from 'src/app/services/dialog-edit-task.service';
import { DialogEditTaskCategoryService } from 'src/app/services/dialog-edit-task-category.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ToolbarModule, CommonModule, TableModule, ButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  tasks!: Task[];
  selectedTasks!: Task[];
  constructor(
    private dialogService: DialogEditTaskService,
    private dialogCategoriesService: DialogEditTaskCategoryService,
    private taskService:TaskService,
  ) {}
  ngOnInit(){
    this.taskService.allItems$.subscribe((val)=>{
      this.tasks  =val;
    })
  }
  handlerOpenEditorTaskForNew() {
    this.dialogService.openDialogEditTask(null);
  }
  handlerOpenEditorTaskCatetories() {
    this.dialogCategoriesService.openDialogEditTask();
  }
}

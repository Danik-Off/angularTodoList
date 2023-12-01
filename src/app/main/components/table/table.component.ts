import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Task } from 'src/app/interfaces/task';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { DialogEditTaskService } from 'src/app/services/dialog-edit-task.service';
import { DialogEditTaskCategoryService } from 'src/app/services/dialog-edit-task-category.service';
import { TaskService } from 'src/app/services/task.service';
import { TaskCategoriesService } from 'src/app/services/task-categories.service';
import { TaskСategory } from 'src/app/interfaces/taskCategory';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ToolbarModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [ConfirmationService],
})
export class TableComponent {
  tasks!: Task[];
  selectedTasks!: Task[];

  categories!:TaskСategory[];

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogEditTaskService,
    private dialogCategoriesService: DialogEditTaskCategoryService,
    private taskService: TaskService,
    private categoryService: TaskCategoriesService,
  ) {}

  ngOnInit() {
    this.taskService.allItems$.subscribe((val) => {
      this.tasks = val;

      this.selectedTasks = val.filter((task) => {
        console.log(task.done)
        return task.done;
      });

    });

    this.categoryService.categories$.subscribe((val) => {
     this.categories = val;
    });

  }
  getCategories(task:Task):string{
    let id = task.taskСategoryId;
    return this.categories.filter((item)=> item.id ===id)[0]?.title;
  }

  handlerOpenEditorTask(id: string) {
    this.dialogService.openDialogEditTask(id);
  }
  handlerOpenEditorTaskForNew() {
    this.dialogService.openDialogEditTask(null);
  }

  handlerOpenEditorTaskCatetories() {
    this.dialogCategoriesService.openDialogEditTask();
  }

  handlerSelectedChange() {
    this.taskService.editStatusItem(this.selectedTasks);
  }

  confirmDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.taskService.deleteItem(id);
      },
      reject: () => {},
    });
  }
}

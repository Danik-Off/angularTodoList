import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Task } from 'src/app/interfaces/task';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogEditTaskService } from 'src/app/services/dialog-edit-task.service';
import { DialogEditTaskCategoryService } from 'src/app/services/dialog-edit-task-category.service';
import { TaskService } from 'src/app/services/task.service';

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
  providers: [ConfirmationService]
})
export class TableComponent {
  tasks!: Task[];
  selectedTasks!: Task[];

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogEditTaskService,
    private dialogCategoriesService: DialogEditTaskCategoryService,
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.taskService.allItems$.subscribe((val) => {
      this.tasks = val;
      this.selectedTasks = val.filter((task) => {
        return task.done;
      });
      console.log(val);
    });
  }
  handlerOpenEditorTask(id:string){
    this.dialogService.openDialogEditTask(id);
  }
  handlerOpenEditorTaskForNew() {
    this.dialogService.openDialogEditTask(null);
  }

  handlerOpenEditorTaskCatetories() {
    this.dialogCategoriesService.openDialogEditTask();
  }


  confirmDelete(id:string) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.taskService.deleteItem(id)
        },
        reject: () => {

            }
        }
    );
}

}

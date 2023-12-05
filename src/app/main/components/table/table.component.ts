import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Task } from 'src/app/interfaces/task';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogEditTaskService } from 'src/app/services/dialog-edit-task.service';
import { DialogEditTaskCategoryService } from 'src/app/services/dialog-edit-task-category.service';
import { TaskService } from 'src/app/services/task.service';
import { TaskCategoriesService } from 'src/app/services/task-categories.service';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import { Subject, takeUntil } from 'rxjs';
import {
  BUTTON_LABEL_ADD,
  BUTTON_LABEL_EDIT_TASK_CATEGORIES,
  TH_LABEL_TEXT,
  TH_LABEL_PRIORITY,
  TH_LABEL_CATEGORY,
  TH_LABEL_DEADLINE,
} from 'src/app/shared/constants';

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
export class TableComponent implements OnInit, OnDestroy {
  addLabelBtn: string = BUTTON_LABEL_ADD;
  editTaskCategoriesLabelBtn: string = BUTTON_LABEL_EDIT_TASK_CATEGORIES;
  textLabelTh: string = TH_LABEL_TEXT;
  priorityLabelTh: string = TH_LABEL_PRIORITY;
  categoryLabelTh: string = TH_LABEL_CATEGORY;
  deadlineLabelTh: string = TH_LABEL_DEADLINE;

  tasks!: Task[];

  selectedTasks!: Task[];

  private ngUnsubscribe = new Subject<void>();

  private categories!: TaskCategory[];

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogEditTaskService,
    private dialogCategoriesService: DialogEditTaskCategoryService,
    private taskService: TaskService,
    private categoryService: TaskCategoriesService,
  ) {}

  ngOnInit(): void {
    this.taskService.allItems$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val) => {
        this.tasks = val;

        this.selectedTasks = val.filter((task) => {
          console.log(task.done);
          return task.done;
        });
      });

    this.categoryService.categories$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val) => {
        this.categories = val;
      });
  }
  getCategories(task: Task): string {
    const ID = task.categoryId;
    return this.categories.filter((item) => item.id === ID)[0]?.title;
  }

  handlerOpenEditorTask(id: string): void {
    this.dialogService.openDialogEditTask(id);
  }

  handlerOpenEditorTaskForNew(): void {
    this.dialogService.openDialogEditTask(null);
  }

  handlerOpenEditorTaskCategories(): void {
    this.dialogCategoriesService.openDialogEditTask();
  }

  handlerSelectedChange(): void {
    this.taskService.editStatusItem(this.selectedTasks);
  }

  confirmDelete(id: string): void {
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import { DialogEditTaskCategoryService } from 'src/app/services/dialog-edit-task-category.service';
import { TaskCategoriesService } from 'src/app/services/task-categories.service';
import { ItemComponent } from './item/item.component';
import { Subject, takeUntil } from 'rxjs';
import {
  BUTTON_LABEL_ADD,
  TITLE_EDIT_TASK_CATEGORY,
} from 'src/app/shared/constants';
@Component({
  selector: 'app-edit-task-category',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    ItemComponent,
  ],
  templateUrl: './edit-task-category.component.html',
  styleUrl: './edit-task-category.component.scss',
})
export class EditTaskCategoryComponent implements OnInit, OnDestroy {
  addLabelBtn: string = BUTTON_LABEL_ADD;
  titleDialog: string = TITLE_EDIT_TASK_CATEGORY;

  visible: boolean = true;

  taskCategories: TaskCategory[] = [];

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private dialogService: DialogEditTaskCategoryService,
    private taskCategoriesService: TaskCategoriesService,
  ) {}

  ngOnInit(): void {
    this.dialogService.dialogState$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.visible = value;
      });

    this.taskCategoriesService.categories$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.taskCategories = value;
      });
  }

  handlerAddBtn(): void {
    this.taskCategoriesService.addCategory('default');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

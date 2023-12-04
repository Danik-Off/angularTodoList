import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TaskСategory } from 'src/app/interfaces/taskCategory';
import { DialogEditTaskCategoryService } from 'src/app/services/dialog-edit-task-category.service';
import { TaskCategoriesService } from 'src/app/services/task-categories.service';
import { ItemComponent } from './item/item.component';
@Component({
  selector: 'app-edit-task-category',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    ItemComponent
  ],
  templateUrl: './edit-task-category.component.html',
  styleUrl: './edit-task-category.component.scss',
})

export class EditTaskCategoryComponent {

  constructor(
    private dialogService: DialogEditTaskCategoryService,
    private taskCategoriesService: TaskCategoriesService,
  ) {}

  visible: boolean = true;

  taskCategories: TaskСategory[] = [];

  ngOnInit() {
    this.dialogService.dialogState$.subscribe((value) => {
      console.log(value);
      this.visible = value;
    });
    this.taskCategoriesService.categories$.subscribe((value) => {
      this.taskCategories = value;
    });
  }

  handlerAddBtn():void {
 this.taskCategoriesService.add("default");
  }
}

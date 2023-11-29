import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TaskСategory } from 'src/app/interfaces/taskCategory';
import { DialogEditTaskService } from 'src/app/services/dialog-edit-task.service';
import { DialogEditTaskCategoryService } from 'src/app/services/dialog-edit-task-category.service';
@Component({
  selector: 'app-edit-task-category',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
  ],
  templateUrl: './edit-task-category.component.html',
  styleUrl: './edit-task-category.component.scss',
})
export class EditTaskCategoryComponent {
  constructor(private dialogService: DialogEditTaskCategoryService) {}
  visible: boolean = false;
  selectedCategory: any;
  taskCategories: TaskСategory[] = [];

  ngOnInit() {
    this.dialogService.dialogState$.subscribe((value)=>{
      console.log(value)
      this.visible =value
    })
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TaskСategory } from '../../interfaces/taskCategory';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
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
  visible: boolean = false;
  selectedCategory: any;
  taskCategories: TaskСategory[] = [];
}

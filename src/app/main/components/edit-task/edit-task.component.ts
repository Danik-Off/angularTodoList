import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TaskСategory } from '../../interfaces/taskCategory';
@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule,DialogModule,InputTextModule, DropdownModule,ButtonModule ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  visible: boolean = false;
  selectedCategory:any;
  taskCategories:TaskСategory[] = [];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './components/table/table.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EditTaskCategoryComponent } from './components/edit-task-category/edit-task-category.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,TableComponent,EditTaskComponent,EditTaskCategoryComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}

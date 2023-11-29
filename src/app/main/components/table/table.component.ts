import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Task } from '../../interfaces/task';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ToolbarModule ,
    CommonModule,
    TableModule,
    ButtonModule,

  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  tasks!: Task[];
  selectedTasks!: Task[];
}

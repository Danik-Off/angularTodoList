import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Task } from '../../interfaces/task';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,TableModule,ButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  tasks!: Task[];
  selectedTasks!: Task[];
}

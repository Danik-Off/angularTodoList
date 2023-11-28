import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  products!: Product[];
}

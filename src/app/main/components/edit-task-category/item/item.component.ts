import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCategoriesService } from 'src/app/services/task-categories.service';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, FormsModule,InputTextModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {
  isEdited: boolean = false;

  editedText!: string ; // Отдельное поле для редактирования текста

  @Input() category?: TaskCategory;

  @ViewChild('inputText') inputText!: ElementRef;

  constructor(private categoryService: TaskCategoriesService) {}

  ngOnInit(): void {
    this.editedText = this.category ? this.category.title : 'empty';
  }

  onDelete(): void {
    if (this.category) {
      this.categoryService.deleteCategory(this.category.id);
    }
  }

  onEdit(): void {
    this.isEdited = true;
    setTimeout(() => {
      this.inputText.nativeElement.focus();
    }, 0);
  }

  onEditEnd(): void {
    if (this.category)
      this.categoryService.editCategory(this.category.id, this.editedText);
    this.isEdited = false;
  }
}

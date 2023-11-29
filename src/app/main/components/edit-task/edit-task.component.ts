import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TaskСategory } from 'src/app/interfaces/taskCategory';
import { DialogEditTaskService } from 'src/app/services/dialog-edit-task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  constructor(private dialogService: DialogEditTaskService) {}
  visible: boolean = false;

  selectedCategory: any;

  taskCategories: TaskСategory[] = [];

  ngOnInit() {
    this.dialogService.dialogState$.subscribe((value)=>{
      console.log(value)
      this.visible =value
    })
  }

  openDialog() {
    this.dialogService.openDialogEditTask();
  }
}

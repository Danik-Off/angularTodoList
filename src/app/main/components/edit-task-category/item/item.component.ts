import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCategoriesService } from 'src/app/services/task-categories.service';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements  OnInit {

  isEdited: boolean = false;

  editedText: string = ''; // Отдельное поле для редактирования текста

  @Input() category?: TaskCategory;

  @ViewChild('inputText') inputText!: ElementRef;


  constructor(
    private categoryService:TaskCategoriesService
  ){}



  ngOnInit():void{
    this.editedText = this.category?this.category.title:"empty";
  }

  onDelete(): void {
    if(this.category){
      this.categoryService.delete(this.category.id)
    }

  }

  onEdit(): void {
    this.isEdited = true;
    setTimeout(()=>{
      this.inputText.nativeElement.focus();
    },0);
  }

  onEditEnd(): void {
    console.log(this.editedText)
    if(this.category)
    this.categoryService.edit(this.category.id,this.editedText)
    this.isEdited = false;
  }
}

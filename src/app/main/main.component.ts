import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EditTaskCategoryComponent } from './components/edit-task-category/edit-task-category.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { TaskService } from '../services/task.service';
import { TaskCategoriesService } from '../services/task-categories.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    EditTaskComponent,
    EditTaskCategoryComponent,
    MenubarModule,
    ButtonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})


export class MainComponent implements OnInit,OnDestroy {
  userName$!:string;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private taskService:TaskService,
    private taskCategoryService:TaskCategoriesService
  ) {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user)=>{
      if(user){
        this.userName$ =  user.name ;
        this.taskService.load(user);
        this.taskCategoryService.load(user);
      }
    });
  }

  handlerSingOutBtn():void  {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

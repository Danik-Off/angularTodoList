import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EditTaskCategoryComponent } from './components/edit-task-category/edit-task-category.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';


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
export class MainComponent implements OnInit{

  userName!:string;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user)=>{
      this.userName = user? user.name: "Unknown user";
    })
  }

  handlerSingOutBtn():void  {
    this.authService.logout();
  }

}

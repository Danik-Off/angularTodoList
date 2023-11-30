import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskСategory } from '../interfaces/taskCategory';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskCategoriesService {
  constructor(private authService: AuthService) {}
  categoties = new BehaviorSubject<TaskСategory[]>([
    {id:"",title:"test"}
  ]);

  categories$ = this.categoties.asObservable();

  add(title: string) {
    const category: TaskСategory = {
      id: crypto.randomUUID(),
      title: title,
    };

    const updatedItems = [category, ...this.categoties.value];
    this.categoties.next(updatedItems);
    this.save();
  }

  edit() {}
  delete() {}

  save() {
    let user = this.authService.getUser();
    localStorage.setItem(
      'todoItems-' + user?.id,
      JSON.stringify(this.categoties.value),
    );
  }

  load() {
    let user = this.authService.getUser();
    const localStorageData = localStorage.getItem('todoItems-' + user?.id);
    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData) as TaskСategory[];

        [];
        this.categoties.next(parsedData);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  }
}

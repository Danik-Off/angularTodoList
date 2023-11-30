import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskСategory } from '../interfaces/taskCategory';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskCategoriesService {
  constructor(private authService: AuthService) {
    this.load();
  }

  categoties = new BehaviorSubject<TaskСategory[]>([
    { id: 'testIdID', title: 'test' },
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
  get(id: string): TaskСategory {
    console.log(this.categoties.value.filter((item) => item.id === id)[0]);
    return this.categoties.value.filter((item) => item.id === id)[0];
  }

  edit(id: string, title: string) {
    const updatedItems = this.categoties.value.map((item) =>
      item.id === id
        ? {
            ...item,
            title,
          }
        : item,
    );
    this.categoties.next(updatedItems);
    this.save();
  }

  delete(id: string) {
    const updatedItems = this.categoties.value.filter((item) => item.id !== id);
    this.categoties.next(updatedItems);
    this.save();
  }

  save() {
    let user = this.authService.getUser();
    localStorage.setItem(
      'todoCategories-' + user?.id,
      JSON.stringify(this.categoties.value),
    );
  }

  load() {
    let user = this.authService.getUser();
    const localStorageData = localStorage.getItem('todoCategories-' + user?.id);
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

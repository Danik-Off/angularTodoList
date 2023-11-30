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
    {id:"testIdID",title:"test"}
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
  get(id:string):TaskСategory{
    return this.categoties.value.filter((item)=>item.id===id)[0];
  }

  edit() {}
  delete() {}

  save() {
    let user = this.authService.getUser();
    localStorage.setItem(
      'todoCategories-' + user?.id,
      JSON.stringify(this.categoties.value),
    );
  }

  load() {
    let user = this.authService.getUser();
    const localStorageData = localStorage.getItem( 'todoCategories-' + user?.id);
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

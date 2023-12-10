import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskCategory } from '../interfaces/taskCategory';
import { User } from '../interfaces/user';

const STORAGE_CATEGORIES_KEY = 'todoCategories-';
@Injectable({
  providedIn: 'root',
})
export class TaskCategoriesService {
  categories = new BehaviorSubject<TaskCategory[]>([
    // { id: 'testIdID', title: 'test' },
  ]);

  categories$ = this.categories.asObservable();

  private user!: User;

  constructor() {}

  addCategory(title: string): void {
    const category: TaskCategory = {
      id: crypto.randomUUID(),
      title: title,
    };

    const updatedItems = [category, ...this.categories.value];
    this.categories.next(updatedItems);
    this.save();
  }

  getCategory(id: string): TaskCategory {
    return this.categories.value.filter((item) => item.id === id)[0];
  }

  editCategory(id: string, title: string): void {
    const updatedItems = this.categories.value.map((item) =>
      item.id === id
        ? {
            ...item,
            title,
          }
        : item,
    );
    this.categories.next(updatedItems);
    this.save();
  }

  deleteCategory(id: string): void {
    const updatedItems = this.categories.value.filter((item) => item.id !== id);
    this.categories.next(updatedItems);
    this.save();
  }

  loadCategory(user: User): void {
    this.user = user;
    const localStorageData = localStorage.getItem(
      STORAGE_CATEGORIES_KEY + user?.id,
    );
    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData) as TaskCategory[];

        [];
        this.categories.next(parsedData);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  }

  private save(): void {
    localStorage.setItem(
      STORAGE_CATEGORIES_KEY + this.user?.id,
      JSON.stringify(this.categories.value),
    );
  }
}

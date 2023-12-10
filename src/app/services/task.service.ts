import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';

const STORAGE_TODO_ITEMS_KEY = 'todoItems-';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  allItems$!: Observable<Task[]>;
  private user!: User;

  private allItemsSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.allItems$ = this.allItemsSubject.asObservable();
  }

  addTask(
    text: string,
    priority: number,
    startDate: Date,
    endDate: Date,
    categoryId: string,
  ): void {
    const newItem: Task = {
      id: crypto.randomUUID(),
      text,
      done: false,
      priority,
      startDate,
      endDate,
      categoryId,
    };
    const updatedItems = [newItem, ...this.allItemsSubject.value];
    this.allItemsSubject.next(updatedItems);
    this.save();
  }
  getTask(id: string): Task {
    return this.allItemsSubject.value.filter((item) => item.id === id)[0];
  }

  editTask(
    id: string,
    text: string,
    priority: number,
    startDate: Date,
    endDate: Date,
    taskCategoryId: string,
  ) {
    const updatedItems = this.allItemsSubject.value.map((item) =>
      item.id === id
        ? {
            ...item,
            text,
            priority,
            startDate,
            endDate,
            categoryId:  taskCategoryId,
          }
        : item,
    );
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  editStatusTask(selectedTasks: Task[]): void {
    const idsSelected = selectedTasks.map((item) => item.id);
    const updatedItems = this.allItemsSubject.value.map((item) =>
      idsSelected.includes(item.id)
        ? { ...item, done: true }
        : { ...item, done: false },
    );
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  deleteTask(id: string): void {
    const updatedItems = this.allItemsSubject.value.filter(
      (item) => item.id !== id,
    );
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  loadTasks(user: User): void {
    console.log(user);
    this.user = user;

    const localStorageData = localStorage.getItem(
      STORAGE_TODO_ITEMS_KEY + this.user?.id,
    );
    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData) as Task[];
        this.allItemsSubject.next(parsedData);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  }
  private save(): void {
    localStorage.setItem(
      STORAGE_TODO_ITEMS_KEY + this.user?.id,
      JSON.stringify(this.allItemsSubject.value),
    );
  }
}

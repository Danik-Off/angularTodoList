import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private allItemsSubject = new BehaviorSubject<Task[]>([]);
  allItems$ = this.allItemsSubject.asObservable();

  constructor(private authService: AuthService) {
    this.load();
    authService.user$.subscribe(() => {
      this.load();
    });
  }

  addItem(
    text: string,
    priority: number,
    startDate: Date,
    endDate: Date,
    taskСategoryId: string,
  ) {
    const newItem: Task = {
      id: crypto.randomUUID(),
      text: text,
      done: false,
      priority: priority,
      startDate: startDate,
      endDate: endDate,
      taskСategoryId: taskСategoryId,
    };
    const updatedItems = [newItem, ...this.allItemsSubject.value];
    this.allItemsSubject.next(updatedItems);
    this.save();
  }
  getItem(id: string): Task {
    return this.allItemsSubject.value.filter((item) => item.id === id)[0];
  }

  editItem(
    id: string,
    text: string,
    priority: number,
    startDate: Date,
    endDate: Date,
    taskСategoryId: string,
  ) {
    const updatedItems = this.allItemsSubject.value.map((item) =>
      item.id === id
        ? {
            ...item,
            text,
            priority: priority,
            startDate: startDate,
            endDate: endDate,
            taskСategoryId: taskСategoryId,
          }
        : item,
    );
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  editStatusItem(selectedTasks: Task[]) {
    console.log(selectedTasks);
    const idsSelected = selectedTasks.map((item) => item.id);
    const updatedItems = this.allItemsSubject.value.map((item) =>
      idsSelected.includes(item.id)
        ? { ...item, done: true }
        : { ...item, done: false },
    );
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  deleteItem(id: string) {
    const updatedItems = this.allItemsSubject.value.filter(
      (item) => item.id !== id,
    );
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  save() {
    let user = this.authService.getUser();
    localStorage.setItem(
      'todoItems-' + user?.id,
      JSON.stringify(this.allItemsSubject.value),
    );
  }

  load() {
    let user = this.authService.getUser();
    const localStorageData = localStorage.getItem('todoItems-' + user?.id);
    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData) as Task[];
        this.allItemsSubject.next(parsedData);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  }
}

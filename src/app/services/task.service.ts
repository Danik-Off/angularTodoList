import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private allItemsSubject = new BehaviorSubject<Task[]>([]);
  allItems$ = this.allItemsSubject.asObservable();

  constructor() {
    this.load();
  }

  chooseAll(choosenAll: boolean) {
    console.log('e');
    const updatedItems = this.allItemsSubject.value.map((item) => ({
      ...item,
      done: choosenAll,
    }));
    this.allItemsSubject.next(updatedItems);
    this.save();
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

  editStatusItem(id: number, done: boolean) {
    const updatedItems = this.allItemsSubject.value.map((item, index) =>
      index === id ? { ...item, done } : item,
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
    localStorage.setItem(
      'todoItems',
      JSON.stringify(this.allItemsSubject.value),
    );
  }

  load() {
    const localStorageData = localStorage.getItem('todoItems');
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

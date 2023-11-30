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

  filter: 'all' | 'active' | 'done' = 'all';
  allSelected: boolean = false;

  get items(): Task[] {
    if (this.filter === 'all') {
      return this.allItemsSubject.value;
    }
    return this.allItemsSubject.value.filter((item) =>
      this.filter === 'done' ? item.done : !item.done,
    );
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

  setFilter(newFilter: 'all' | 'active' | 'done'): void {
    this.filter = newFilter;
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

  editItem(id: string, text: string,priority:number, startDate:Date,endDate:Date,taskСategoryId:string) {
    const updatedItems = this.allItemsSubject.value.filter(
      (item) => item.id !== id ? { ...item, text, priority, startDate,  endDate,
        taskСategoryId } : item,
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

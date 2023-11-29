import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private allItemsSubject = new BehaviorSubject<Task[]>([]);
  allItems$ = this.allItemsSubject.asObservable();


  filter: 'all' | 'active' | 'done' = 'all';
  allSelected: boolean = false;

  get items(): Task[] {
    if (this.filter === 'all') {
      return this.allItemsSubject.value;
    }
    return this.allItemsSubject.value.filter((item) =>
      this.filter === 'done' ? item.done : !item.done
    );
  }

  ngOnInit() {
    this.load();
  }

  ngDoCheck() {
    if (this.allItemsSubject.value.length > 0) {
      const doneCount = this.allItemsSubject.value.reduce((acc, item) => {
        if (item.done) acc++;
        return acc;
      }, 0);

      this.allSelected = doneCount === this.allItemsSubject.value.length;
    }
  }

  chooseAll(choosenAll: boolean) {
    console.log("e")
    const updatedItems = this.allItemsSubject.value.map((item) => ({ ...item, done: choosenAll }));
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  setFilter(newFilter: 'all' | 'active' | 'done'): void {
    this.filter = newFilter;
  }

  addItem(text: string) {
    const newItem: Task = {
      id: crypto.randomUUID(),
      text: text,
      done: false,
      priority: 0,
      startDate: new Date(),
      endDate: new Date(),
      taskСategoryId: 0
    };
    const updatedItems = [newItem, ...this.allItemsSubject.value];
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  editTextItem(id: number, text: string) {
    const updatedItems = this.allItemsSubject.value.map((item, index) => index === id ? { ...item, text } : item);
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  editStatusItem(id: number, done: boolean) {
    const updatedItems = this.allItemsSubject.value.map((item, index) => index === id ? { ...item, done } : item);
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  deleteItem(id: number) {
    if (id >= 0 && id < this.items.length) {
      const updatedItems = this.allItemsSubject.value.filter((item, index) => index !== id);
      this.allItemsSubject.next(updatedItems);
      this.save();
    }
  }

  save() {
    localStorage.setItem('todoItems', JSON.stringify(this.allItemsSubject.value));
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

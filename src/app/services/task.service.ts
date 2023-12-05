import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task';
import { AuthService } from './auth.service';


const STORAGE_TODO_ITEMS_KEY = 'todoItems-';
@Injectable({
  providedIn: 'root',
})

export class TaskService {



  private user = this.authService.getUser();

  private allItemsSubject = new BehaviorSubject<Task[]>([]);
  allItems$ = this.allItemsSubject.asObservable();


  constructor(private authService: AuthService) {
    this.load();
  }



  addItem (
    text: string,
    priority: number,
    startDate: Date,
    endDate: Date,
    categoryId: string,
  ):void  {
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
            priority,
            startDate,
            endDate,
            taskCategoryId: taskСategoryId,
          }
        : item,
    );
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  editStatusItem(selectedTasks: Task[]):void  {
    const idsSelected = selectedTasks.map((item) => item.id);
    const updatedItems = this.allItemsSubject.value.map((item) =>
      idsSelected.includes(item.id)
        ? { ...item, done: true }
        : { ...item, done: false },
    );
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  deleteItem(id: string):void  {
    const updatedItems = this.allItemsSubject.value.filter(
      (item) => item.id !== id,
    );
    this.allItemsSubject.next(updatedItems);
    this.save();
  }

  private save():void  {

    localStorage.setItem(
      STORAGE_TODO_ITEMS_KEY+ this.user?.id,
      JSON.stringify(this.allItemsSubject.value),
    );
  }

  private load() :void {


    const localStorageData = localStorage.getItem(STORAGE_TODO_ITEMS_KEY + this.user?.id);
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

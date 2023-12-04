import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogEditTaskCategoryService {
  private dialogStateSubject = new BehaviorSubject<boolean>(false);
  constructor() { }
  dialogState$ = this.dialogStateSubject.asObservable();

  openDialogEditTask():void  {
    this.dialogStateSubject.next(true);
  }

  closeDialogEditTask():void  {
    this.dialogStateSubject.next(false);
  }
}

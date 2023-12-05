import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogEditTaskService {

  private dialogStateSubject = new BehaviorSubject<string|null>(null);
  dialogState$ = this.dialogStateSubject.asObservable();

  constructor() {}

  openDialogEditTask(id:string|null):void  {
    this.dialogStateSubject.next(id);
  }

}

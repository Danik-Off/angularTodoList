import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogEditTaskService {
  constructor() {}
  private dialogStateSubject = new BehaviorSubject<string|null>(null);
  dialogState$ = this.dialogStateSubject.asObservable();

  openDialogEditTask(id:string|null) {
    this.dialogStateSubject.next(id);
  }

}

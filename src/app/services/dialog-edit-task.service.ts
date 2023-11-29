import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogEditTaskService {
  constructor() {}
  private dialogStateSubject = new BehaviorSubject<boolean>(false);
  dialogState$ = this.dialogStateSubject.asObservable();

  openDialogEditTask(id:string|null) {
    this.dialogStateSubject.next(true);
  }

  closeDialogEditTask() {
    this.dialogStateSubject.next(false);
  }
}

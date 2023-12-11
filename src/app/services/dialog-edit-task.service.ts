import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogEditTaskService {

  dialogState$!: Observable<boolean|string>;

  private dialogStateSubject = new BehaviorSubject<boolean|string>(false);

  constructor() {
    this.dialogState$ = this.dialogStateSubject.asObservable();
  }

  openDialogEditTask(id: string | boolean): void {
    this.dialogStateSubject.next(id);
  }
  closeDialogEditTask(): void {
    this.dialogStateSubject.next(false);
  }
}

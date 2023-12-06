import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogEditTaskService {
  dialogState$!: Observable<string | null>;

  private dialogStateSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    this.dialogState$ = this.dialogStateSubject.asObservable();
  }

  openDialogEditTask(id: string | null): void {
    this.dialogStateSubject.next(id);
  }
}

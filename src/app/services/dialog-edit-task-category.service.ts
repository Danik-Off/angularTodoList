import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogEditTaskCategoryService {
  dialogState$!: Observable<boolean>;
  private dialogStateSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.dialogState$ = this.dialogStateSubject.asObservable();
  }

  openDialogEditTaskCategory(): void {
    this.dialogStateSubject.next(true);
  }

  closeDialogEditTaskCategory(): void {
    this.dialogStateSubject.next(false);
  }
}

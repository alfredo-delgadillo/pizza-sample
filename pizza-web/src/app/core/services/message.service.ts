import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  constructor(private popup: MatSnackBar) { }
  
  showMessage(message: string, isError: boolean = false): void {
    let className: string;
    if (isError) 
      className = 'error';
    else
      className = 'success';

    this.popup.open(message, 'X', {
      panelClass: [className],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
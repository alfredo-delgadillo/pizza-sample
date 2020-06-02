import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  constructor(public popup: MatSnackBar) { }
  
  showMessage(message: string, isError: boolean = false): void {
    if (isError)    
    this.popup.open(message);
    else
    this.popup.open(message, 'x', {panelClass: ['materialdialog', 'error']});
  }
}
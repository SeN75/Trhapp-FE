import { Injectable, inject } from '@angular/core';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { SnackType } from '../types/toaster.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  toaterModel = inject(MatSnackBar);
  public error(
    message: string,
    snackType: SnackType = 'Error',
    duration = 5000
  ) {
    this.toaterModel.openFromComponent(ToasterComponent, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['bg-error', 'text-error-contrast'],
      direction: 'rtl',
      data: {
        message: message,
        snackType: snackType,
        snackBar: this.toaterModel,
        duration: duration,
      },
    });
  }
  public warn(message: string, snackType: SnackType = 'Warn', duration = 5000) {
    this.toaterModel.openFromComponent(ToasterComponent, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['bg-warn', 'text-warn-contrast'],
      direction: 'ltr',
      data: {
        message: message,
        snackType: snackType,
        snackBar: this.toaterModel,
        duration: duration,
      },
    });
  }
  public success(
    message: string,
    snackType: SnackType = 'Success',
    duration = 5000
  ) {
    this.toaterModel.openFromComponent(ToasterComponent, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['bg-success', 'text-success-contrast'],
      direction: 'ltr',
      data: {
        message: message,
        snackType: snackType,
        snackBar: this.toaterModel,
        duration: duration,
      },
    });
  }
}

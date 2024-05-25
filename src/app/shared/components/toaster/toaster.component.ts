import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: ` <div
    class="snack_container {{
      getIcon === 'close' ? 'justify-content-between' : ''
    }} "
  >
    <span>{{ data.message }}</span>
    <span *ngIf="getIcon === 'timer'" class="mx-1">
      {{ minutes | number : '2.0-0' }}:{{ seconds | number : '2.0-0' }}
    </span>
    <button mat-icon-button (click)="action()">
      <mat-icon>{{ getIcon }}</mat-icon>
    </button>
  </div>`,
  styles: [
    `
      .snack_container {
        min-height: 34px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
      }

      mat-icon {
        width: 24px !important;
        height: 24px !important;
        font-size: 24px !important;
      }
    `,
  ],
})
export class ToasterComponent {
  timer = 0;
  countDownCountr = 0;
  seconds = 0;
  minutes = 0;
  public data: any = inject(MAT_SNACK_BAR_DATA);
  get getIcon() {
    switch (this.data.snackType) {
      case 'Success':
        return 'done';
      case 'Error':
        return 'error';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'info';
      case 'Close':
        return 'close';
      case 'Timer':
        this.countDown();
        return 'timer';
      default:
        return 'close';
    }
  }
  action() {
    if (this.getIcon == 'close') this.data.snackBar.dismiss();
    this.data.snackBar.dismiss();
  }
  countDown() {
    if (this.countDownCountr == 0) {
      this.seconds = 0;
      this.minutes = 2;
      const duration = this.data.duration;
      const MEILE_SEC = 1000;
      const SECOND_ON_MINUTE = 60;

      const _seconds = duration / MEILE_SEC;
      const _minutes = Math.trunc(_seconds / SECOND_ON_MINUTE);
      this.seconds = _seconds % 59;
      this.minutes = _seconds > SECOND_ON_MINUTE ? _minutes : 0;
      this.countDownCountr++;
      setInterval(() => {
        if (this.minutes - 1 >= 0 && this.seconds <= 0) {
          this.minutes--;
          this.seconds = 59;
        } else if (
          this.minutes >= 0 &&
          this.seconds <= 59 &&
          this.seconds > 0
        ) {
          this.seconds--;
        } else {
          clearInterval(0);
        }
      }, 1000);
    }
  }
}

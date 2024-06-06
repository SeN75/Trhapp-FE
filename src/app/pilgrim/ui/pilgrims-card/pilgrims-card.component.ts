import { PilgrimAction } from '@/pilgrim/data-access/store/pilgrim.action';
import { PilgrimUploadImageComponent } from '@/pilgrim/features/pilgrim-upload-image/pilgrim-upload-image.component';
import { PilgrimState } from '@/pilgrim/utils/types/pilgrim.type';
import { Pilgrim } from '@/shared/types/base.type';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tp-pilgrims-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pilgrims-card.component.html',
  styleUrl: './pilgrims-card.component.scss',
})
export class PilgrimsCardComponent {
  @Input() isEditMode = false;
  @Input({ required: true }) data: Pilgrim = {
    id: '123456',
    bus_accommodation: {} as any, // Foreign key reference to Bus
    national_id: '9876543210',
    permit_status: 'approved',
    name: 'محمد بن أحمد بن عبدالله',
    is_male: true,
    nationality: 'Saudi',
    phone_number: '+966501234567',
    status: true,
    booking_reference: 'bookingRef123',
    package_name: 'Premium Hajj Package',
    package_number: 'باقة (1)',
    transportation: 'Bus',
    date_of_birth: '1990-01-01', // ISO date format
    date_of_birth_hijri: '1410-05-06', // Example Hijri date string
    city: 'Mecca',
    code: 'MEC123',
  };
  private dialog = inject(MatDialog);
  private store = inject(Store<{ pilgrims: PilgrimState }>);
  no_image =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
  ngOnInit(): void {}
  openDialog() {
    this.store.dispatch(PilgrimAction.reset());
    this.dialog.open(PilgrimUploadImageComponent, {
      data: this.data,
    });
  }
  ngOnDestroy(): void {}
}

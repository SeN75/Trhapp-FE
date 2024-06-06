import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pilgrim } from '@/shared/types/base.type';
import { NgStyle } from '@angular/common';
import { PilgrimsCardComponent } from '@/pilgrim/ui/pilgrims-card/pilgrims-card.component';

@Component({
  selector: 'app-pilgrim-profile',
  standalone: true,
  imports: [NgStyle, PilgrimsCardComponent],
  templateUrl: './pilgrim-profile.component.html',
  styleUrl: './pilgrim-profile.component.scss',
})
export class PilgrimProfileComponent implements OnInit, OnDestroy {
  no_image =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
  data: Pilgrim = {
    id: '123456',
    bus_accommodation: 'bus123' as any, // Foreign key reference to Bus
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
  ngOnInit(): void {
    const data = JSON.parse(
      localStorage['TPPilgrim'] ? localStorage['TPPilgrim'] : '{}'
    );
    if (data && Object.keys(data).length > 0) {
      this.data = data;
    }
    console.log(this.data);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('TPPilgrim');
  }
}

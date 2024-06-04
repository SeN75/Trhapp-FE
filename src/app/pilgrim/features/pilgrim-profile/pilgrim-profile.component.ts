import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Pilgrim } from '@/shared/types/base.type';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-pilgrim-profile',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './pilgrim-profile.component.html',
  styleUrl: './pilgrim-profile.component.scss',
})
export class PilgrimProfileComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  ngAfterViewInit(): void {}
  @ViewChild('headline') h?: ElementRef<HTMLElement>;
  @ViewChild('imageContainer') imageCtr?: ElementRef<HTMLElement>;

  data: Pilgrim = {
    id: '123456',
    mina_tent_accommodation: 'minaTent123', // Foreign key reference to BedTentMina
    bus_accommodation: 'bus123', // Foreign key reference to Bus
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
    mina_building_accommodation: 'minaBuilding123', // Foreign key reference to BedBuidingMina
    arafah_accommodation: '', // Foreign key reference to BedTentArafah
  };
  ngOnInit(): void {
    const data = JSON.parse(
      localStorage['TPPilgrim'] ? localStorage['TPPilgrim'] : '{}'
    );
    if (data && Object.keys(data).length > 0) {
      this.data = data;
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem('TPPilgrim');
  }
}

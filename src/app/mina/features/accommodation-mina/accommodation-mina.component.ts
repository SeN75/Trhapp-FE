import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StateCardComponent } from '@/shared/components/state-card/state-card.component';
import { AccommodationMinaTableComponent } from '../../ui/accommodation-mina-table/accommodation-mina-table.component';

@Component({
  selector: 'app-accommodation-mina',
  standalone: true,
  imports: [CommonModule, StateCardComponent, AccommodationMinaTableComponent],
  templateUrl: './accommodation-mina.component.html',
  styleUrl: './accommodation-mina.component.scss',
})
export class AccommodationMinaComponent implements OnInit {
  ngOnInit(): void {}
}

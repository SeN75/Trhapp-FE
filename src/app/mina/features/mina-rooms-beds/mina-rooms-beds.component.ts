import { MinaRoomsBedsTableComponent } from '@/mina/ui/mina-rooms-beds-table/mina-rooms-beds-table.component';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tp-mina-rooms-beds',
  standalone: true,
  imports: [MinaRoomsBedsTableComponent],
  templateUrl: './mina-rooms-beds.component.html',
  styleUrl: './mina-rooms-beds.component.scss',
})
export class MinaRoomsBedsComponent {
  private aRouter = inject(ActivatedRoute);
  building = 0;
  floor = 0;
  room = 0;
  ngOnInit(): void {
    this.building = this.aRouter.snapshot.params['id'] || 0;
    this.floor = this.aRouter.snapshot.params['floorId'] || 0;
    this.room = this.aRouter.snapshot.params['roomId'] || 0;
  }
}

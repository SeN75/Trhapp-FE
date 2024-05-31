import { MinaRoomsTableComponent } from '@/mina/ui/mina-rooms-table/mina-rooms-table.component';
import { MaterialModule } from '@/shared/module/material.module';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tp-mina-rooms',
  standalone: true,
  imports: [MaterialModule, MinaRoomsTableComponent],
  templateUrl: './mina-rooms.component.html',
  styleUrl: './mina-rooms.component.scss',
})
export class MinaRoomsComponent implements OnInit {
  private aRouter = inject(ActivatedRoute);
  building = 0;
  floor = 0;
  ngOnInit(): void {
    this.building = this.aRouter.snapshot.params['id'] || 0;
    this.floor = this.aRouter.snapshot.params['floorId'] || 0;
  }
}

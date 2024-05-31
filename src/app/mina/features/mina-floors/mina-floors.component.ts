import { MinaAllocationStatusComponent } from '@/mina/ui/mina-allocation-status/mina-allocation-status.component';
import { MinaFloorsTableComponent } from '@/mina/ui/mina-floors-table/mina-floors-table.component';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tp-mina-floors',
  standalone: true,
  imports: [MinaFloorsTableComponent, MinaAllocationStatusComponent],
  templateUrl: './mina-floors.component.html',
  styleUrl: './mina-floors.component.scss',
})
export class MinaFloorsComponent implements OnInit {
  private aRouter = inject(ActivatedRoute);
  building = 0;
  ngOnInit(): void {
    this.building = this.aRouter.snapshot.params['id'] || 0;
  }
}

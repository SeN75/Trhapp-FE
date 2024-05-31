import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '@/shared/module/material.module';
import { MinaAllocationStatusComponent } from '../../ui/mina-allocation-status/mina-allocation-status.component';
import { MinaBedsTableComponent } from '../../ui/mina-beds-table/mina-beds-table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mina-beds',
  standalone: true,
  imports: [
    MaterialModule,
    MinaAllocationStatusComponent,
    MinaBedsTableComponent,
  ],
  templateUrl: './mina-beds.component.html',
  styleUrl: './mina-beds.component.scss',
})
export class MinaBedsComponent implements OnInit {
  suiteId = 0;
  loungeId = 0;

  private aRouter = inject(ActivatedRoute);

  ngOnInit(): void {
    this.suiteId = this.aRouter.snapshot.params['id'];
    this.loungeId = this.aRouter.snapshot.params['loungeId'];
  }
}

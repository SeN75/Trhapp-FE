import { ArafaTentBedsTableComponent } from '@/arafah/ui/arafa-tent-beds-table/arafa-tent-beds-table.component';
import { ArafahAllocationStatusComponent } from '@/arafah/ui/arafah-allocation-status/arafah-allocation-status.component';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tp-arafah-tent-beds',
  standalone: true,
  imports: [ArafaTentBedsTableComponent, ArafahAllocationStatusComponent],
  templateUrl: './arafah-tent-beds.component.html',
  styleUrl: './arafah-tent-beds.component.scss',
})
export class ArafahTentBedsComponent implements OnInit {
  private aRouter = inject(ActivatedRoute);
  loungeId = this.aRouter.snapshot.params['id'] || 0;
  pack = this.aRouter.snapshot.params['pack'] || 'package1';
  ngOnInit(): void {
    // this.aRouter.params.subscribe((params) => {
    //   this.pack = params['pack'] || 'package1';
    //   this.loungeId = +params['id'] || 0;
    // });
  }
}
